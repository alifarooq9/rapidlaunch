"use server";

import { orgConfig } from "@/config/organization";
import { db } from "@/server/db";
import {
    membersToOrganizations,
    orgRequests,
    organizations,
} from "@/server/db/schema";
import { protectedProcedure } from "@/server/procedures";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";

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

export async function getOrgMembersQuery() {
    const { currentOrg } = await getOrganizations();

    return await db.query.membersToOrganizations
        .findMany({
            where: eq(membersToOrganizations.organizationId, currentOrg.id),
            with: {
                user: {
                    columns: {
                        id: true,
                        email: true,
                        image: true,
                        name: true,
                    },
                },
            },
        })
        .execute();
}
