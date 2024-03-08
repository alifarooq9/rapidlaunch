"use server";

import {
    membersToOrganizations,
    orgRequests,
    organizations,
} from "@/server/db/schema";
import { db } from "@/server/db";
import { protectedProcedure } from "@/server/procedures";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { orgConfig } from "@/config/organization";

// TODO: add role level access control

type CreateOrgProps = Omit<typeof organizations.$inferInsert, "id" | "ownerId">;

export async function createOrgAction({ ...props }: CreateOrgProps) {
    const { user } = await protectedProcedure();

    const createOrg = await db
        .insert(organizations)
        .values({ ownerId: user.id, ...props })
        .returning()
        .execute();

    await db.insert(membersToOrganizations).values({
        memberId: user.id,
        organizationId: createOrg[0]!.id,
        role: "Admin",
    });

    return createOrg[0];
}

export async function getUserOrgsAction() {
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
    const userOrgs = await getUserOrgsAction();

    const defaultOrg = cookies().get(orgConfig.cookieName)?.value;

    const currentOrg =
        userOrgs.find((org) => org.id === defaultOrg) ?? userOrgs[0];

    return {
        currentOrg: currentOrg as typeof organizations.$inferSelect,
        userOrgs,
    };
}

type UpdateOrgNameProps = {
    name: string;
};

export async function updateOrgNameAction({ name }: UpdateOrgNameProps) {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.memberId, user.id),
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

    return updateName;
}

export async function deleteOrgAction() {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.memberId, user.id),
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

    return deleteOrg;
}

type OrgRequestProps = {
    orgId: string;
};

export async function sendOrgRequestAction({ orgId }: OrgRequestProps) {
    const { user } = await protectedProcedure();

    return await db
        .insert(orgRequests)
        .values({ organizationId: orgId, userId: user.id })
        .onConflictDoNothing({
            where: and(
                eq(orgRequests.organizationId, orgId),
                eq(orgRequests.userId, user.id),
            ),
        })
        .execute();
}

export async function getOrgRequestsAction() {
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

type AcceptOrgRequestProps = {
    requestId: string;
};

export async function acceptOrgRequestAction({
    requestId,
}: AcceptOrgRequestProps) {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.memberId, user.id),
            eq(membersToOrganizations.organizationId, currentOrg.id),
        ),
    });

    if (!memToOrg) {
        throw new Error("You are not a member of this organization");
    }

    const request = await db.query.orgRequests.findFirst({
        where: eq(orgRequests.id, requestId),
    });

    if (!request) {
        throw new Error("Request not found");
    }

    await db.insert(membersToOrganizations).values({
        memberId: request.userId,
        organizationId: currentOrg.id,
    });

    return await db
        .delete(orgRequests)
        .where(eq(orgRequests.id, requestId))
        .execute();
}

type DeclineOrgRequestProps = {
    requestId: string;
};

export async function declineOrgRequestAction({
    requestId,
}: DeclineOrgRequestProps) {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.memberId, user.id),
            eq(membersToOrganizations.organizationId, currentOrg.id),
        ),
    });

    if (!memToOrg) {
        throw new Error("You are not a member of this organization");
    }

    return await db
        .delete(orgRequests)
        .where(eq(orgRequests.id, requestId))
        .execute();
}

type GetOrgByIdProps = {
    orgId: string;
};

export async function getOrgById({ orgId }: GetOrgByIdProps) {
    await protectedProcedure();

    const org = await db.query.organizations.findFirst({
        where: and(eq(organizations.id, orgId)),
        columns: {
            name: true,
            image: true,
        },
    });

    if (!org) {
        throw new Error("Organization not found");
    }

    return org;
}

export async function getOrgMembersAction() {
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

type UpdateMemberRoleProps = {
    memberId: string;
    role: typeof membersToOrganizations.$inferSelect.role;
};

export async function updateMemberRoleAction({
    memberId,
    role,
}: UpdateMemberRoleProps) {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.memberId, user.id),
            eq(membersToOrganizations.organizationId, currentOrg.id),
            eq(membersToOrganizations.role, "Admin"),
        ),
    });

    if (!memToOrg) {
        throw new Error("You are not an admin of this organization");
    }

    return await db
        .update(membersToOrganizations)
        .set({ role: role })
        .where(
            and(
                eq(membersToOrganizations.memberId, memberId),
                eq(membersToOrganizations.organizationId, currentOrg.id),
            ),
        )
        .execute();
}

type RemoveUserProps = {
    userId: string;
};

export async function removeUserAction({ userId }: RemoveUserProps) {
    const { user } = await protectedProcedure();

    const { currentOrg } = await getOrganizations();

    const memToOrg = await db.query.membersToOrganizations.findFirst({
        where: and(
            eq(membersToOrganizations.memberId, user.id),
            eq(membersToOrganizations.organizationId, currentOrg.id),
            eq(membersToOrganizations.role, "Admin"),
        ),
    });

    if (!memToOrg) {
        throw new Error("You are not an admin of this organization");
    }

    return await db
        .delete(membersToOrganizations)
        .where(
            and(
                eq(membersToOrganizations.memberId, userId),
                eq(membersToOrganizations.organizationId, currentOrg.id),
            ),
        )
        .execute();
}
