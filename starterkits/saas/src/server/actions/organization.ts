"use server";

import { membersToOrganizations, organizations } from "@/server/db/schema";
import { db } from "@/server/db";
import { protectedProcedure } from "@/server/procedures";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { orgConfig } from "@/config/organization";

const ORG_CACHE_KEY = "get-organization";

type CreateOrgProps = Omit<typeof organizations.$inferInsert, "id" | "ownerId">;

export async function createOrgAction({ ...props }: CreateOrgProps) {
    const { user } = await protectedProcedure();

    const createOrg = await db
        .insert(organizations)
        .values({ ownerId: user.id, ...props })
        .returning()
        .execute();

    await db.insert(membersToOrganizations).values({
        userId: user.id,
        organizationId: createOrg[0]!.id,
    });

    await revalidateOrganizationsTag();

    return createOrg[0];
}

export async function getUserOrgsAction() {
    const { user } = await protectedProcedure();

    return (
        await db.query.membersToOrganizations
            .findMany({
                where: eq(membersToOrganizations.userId, user.id),
                with: {
                    organization: true,
                },
            })
            .execute()
    ).map((mto) => ({
        ...mto.organization,
    }));
}

type OrganizationReturnType = {
    currentOrg: typeof organizations.$inferSelect;
    userOrgs: (typeof organizations.$inferSelect)[];
};

export const revalidateOrganizationsTag = async () => {
    revalidateTag(ORG_CACHE_KEY);
};

export const getOrganizations = cache(
    async (): Promise<OrganizationReturnType> => {
        const userOrgs = await getUserOrgsAction();

        const defaultOrg = cookies().get(orgConfig.cookieName)?.value;

        const currentOrg =
            userOrgs.find((org) => org.id === defaultOrg) ?? userOrgs[0];

        return {
            currentOrg: currentOrg as typeof organizations.$inferSelect,
            userOrgs,
        };
    },
    [ORG_CACHE_KEY],
    { tags: [ORG_CACHE_KEY], revalidate: 3600 },
);

type UpdateOrgNameProps = {
    name: string;
};

export async function updateOrgNameAction({ name }: UpdateOrgNameProps) {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.userId, user.id),
            eq(membersToOrganizations.organizationId, currentOrg.id),
        ),
    });

    if (!memToOrg) {
        throw new Error("You are not a member of this organization");
    }

    const updateName = await db
        .update(organizations)
        .set({ name })
        .where(eq(organizations.id, currentOrg.id))
        .execute();

    await revalidateOrganizationsTag();

    return updateName;
}

export async function deleteOrgAction() {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.userId, user.id),
            eq(membersToOrganizations.organizationId, currentOrg.id),
        ),
    });

    if (!memToOrg) {
        throw new Error("You are not a member of this organization");
    }

    const deleteOrg = await db
        .delete(organizations)
        .where(eq(organizations.id, currentOrg.id))
        .execute();

    await revalidateOrganizationsTag();

    return deleteOrg;
}
