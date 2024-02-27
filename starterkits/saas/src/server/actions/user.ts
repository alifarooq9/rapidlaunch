"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { protectedProcedure, superAdminProcedure } from "@/server/procedures";

type UpdateNameProps = {
    name: string;
};

export async function updateNameAction({ name }: UpdateNameProps) {
    const { user } = await protectedProcedure();

    return await db
        .update(users)
        .set({ name })
        .where(eq(users.email, user.email!))
        .execute();
}

type UpdateRoleProps = {
    userId: string;
    role: typeof users.$inferSelect.role;
};

export async function updateRoleAction({ userId, role }: UpdateRoleProps) {
    await superAdminProcedure();

    return await db
        .update(users)
        .set({ role })
        .where(eq(users.id, userId))
        .execute();
}
