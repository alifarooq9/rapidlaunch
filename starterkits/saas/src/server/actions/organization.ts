"use server";

import { membersToOrganizations, organizations } from "@/server/db/schema";
import { db } from "@/server/db";
import { protectedProcedure } from "@/server/procedures";
import { eq } from "drizzle-orm";

// exclude id and ownerId from props
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

    return createOrg[0];
}

export async function getUserOrgs() {
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
