"use server";

import { orgConfig } from "@/config/organization";
import { db } from "@/server/db";
import {
    membersToOrganizations,
    orgRequests,
    organizations,
} from "@/server/db/schema";
import { adminProcedure, protectedProcedure } from "@/server/procedures";
import { and, asc, count, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import { unstable_noStore as noStore } from "next/cache";

export async function getUserOrgsQuery() {
    const { user } = await protectedProcedure();

    return (
        await db.query.membersToOrganizations
            .findMany({
                where: eq(membersToOrganizations.memberId, user.id),
                with: {
                    organization: true,
                },
            })
            .execute()
    ).map((mto) => ({
        ...mto.organization,
    }));
}

export async function getOrganizations() {
    const userOrgs = await getUserOrgsQuery();

    const defaultOrg = cookies().get(orgConfig.cookieName)?.value;

    const currentOrg =
        userOrgs.find((org) => org.id === defaultOrg) ?? userOrgs[0];

    return {
        currentOrg: currentOrg as typeof organizations.$inferSelect,
        userOrgs,
    };
}

export async function getOrgRequestsQuery() {
    await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    return await db.query.orgRequests
        .findMany({
            where: eq(orgRequests.organizationId, currentOrg.id),
            with: {
                user: true,
            },
        })
        .execute();
}

/**
 * @purpose Get organization by id
 * @param orgId
 * @returns organization
 */

type GetOrgByIdProps = {
    orgId: string;
};

export async function getOrgByIdQuery({ orgId }: GetOrgByIdProps) {
    await protectedProcedure();

    return await db.query.organizations.findFirst({
        where: and(eq(organizations.id, orgId)),
        columns: {
            name: true,
            image: true,
        },
    });
}

/**
 * @purpose Get paginated users
 * @param page - page number
 * @param per_page - number of items per page
 * @param sort - sort by column
 * @param email - filter by email
 * @param role - filter by role
 * @param operator - filter by operator
 * @returns Paginated users
 */

const panginatedOrgMembersPropsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    operator: z.string().optional(),
});

type GetPaginatedOrgMembersQueryProps = z.infer<
    typeof panginatedOrgMembersPropsSchema
>;

export async function getPaginatedOrgMembersQuery(
    input: GetPaginatedOrgMembersQueryProps,
) {
    const { currentOrg } = await getOrganizations();

    noStore();
    const offset = (input.page - 1) * input.per_page;

    const [column, order] = (input.sort?.split(".") as [
        keyof typeof membersToOrganizations.$inferSelect | undefined,
        "asc" | "desc" | undefined,
    ]) ?? ["title", "desc"];

    const roles =
        (input.role?.split(
            ".",
        ) as (typeof membersToOrganizations.$inferSelect.role)[]) ?? [];

    const { data, total } = await db.transaction(async (tx) => {
        const data = await tx.query.membersToOrganizations.findMany({
            offset,
            limit: input.per_page,
            where: and(
                eq(membersToOrganizations.organizationId, currentOrg.id),
                or(
                    input.email
                        ? ilike(
                              membersToOrganizations.memberEmail,
                              `%${input.email}%`,
                          )
                        : undefined,

                    roles.length > 0
                        ? inArray(membersToOrganizations.role, roles)
                        : undefined,
                ),
            ),
            with: {
                member: {
                    columns: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                    },
                },
            },
            orderBy:
                column && column in membersToOrganizations
                    ? order === "asc"
                        ? asc(membersToOrganizations[column])
                        : desc(membersToOrganizations[column])
                    : desc(membersToOrganizations.createdAt),
        });

        const total = await tx
            .select({
                count: count(),
            })
            .from(membersToOrganizations)
            .where(
                and(
                    eq(membersToOrganizations.organizationId, currentOrg.id),
                    or(
                        input.email
                            ? ilike(
                                  membersToOrganizations.memberEmail,
                                  `%${input.email}%`,
                              )
                            : undefined,

                        roles.length > 0
                            ? inArray(membersToOrganizations.role, roles)
                            : undefined,
                    ),
                ),
            )
            .execute()
            .then((res) => res[0]?.count ?? 0);

        return { data, total };
    });

    const pageCount = Math.ceil(total / input.per_page);

    return { data, pageCount, total };
}

const panginatedOrgPropsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    operator: z.string().optional(),
});

type GetPaginatedOrgsQueryProps = z.infer<typeof panginatedOrgPropsSchema>;

export async function getPaginatedOrgsQuery(input: GetPaginatedOrgsQueryProps) {
    noStore();
    await adminProcedure();

    const offset = (input.page - 1) * input.per_page;

    const [column, order] = (input.sort?.split(".") as [
        keyof typeof organizations.$inferSelect | undefined,
        "asc" | "desc" | undefined,
    ]) ?? ["title", "desc"];

    const { data, total } = await db.transaction(async (tx) => {
        const response = await tx.query.organizations.findMany({
            where: input.email
                ? ilike(organizations.email, `%${input.email}%`)
                : undefined,
            with: {
                owner: true,
                membersToOrganizations: {
                    with: {
                        member: true,
                    },
                },
                subscriptions: true,
            },
            offset,
            limit: input.per_page,
            orderBy:
                column && column in organizations
                    ? order === "asc"
                        ? asc(organizations[column])
                        : desc(organizations[column])
                    : desc(organizations.createdAt),
        });

        const data = response.map((org) => {
            return {
                ...org,
                members: org.membersToOrganizations.map((mto) => {
                    return {
                        ...mto.member,
                        role: mto.role,
                    };
                }),
            };
        });

        const total = await tx
            .select({
                count: count(),
            })
            .from(organizations)
            .where(
                or(
                    input.email
                        ? ilike(organizations.email, `%${input.email}%`)
                        : undefined,
                ),
            )
            .execute()
            .then((res) => res[0]?.count ?? 0);

        return { data, total };
    });

    const pageCount = Math.ceil(total / input.per_page);

    return { data, pageCount, total };
}
