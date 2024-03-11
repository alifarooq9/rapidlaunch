"use server";

import { db } from "@/server/db";
import { accounts, users } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import {
    adminProcedure,
    protectedProcedure,
    superAdminProcedure,
} from "@/server/procedures";

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

type UpdateImageProps = {
    image: string;
};

export async function updateImageAction({ image }: UpdateImageProps) {
    const { user } = await protectedProcedure();

    return await db
        .update(users)
        .set({ image })
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

export async function getAllUsers() {
    await adminProcedure();

    return await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
    });
}

type DeleteUserProps = {
    userId: string;
};

export async function deleteUserAction({ userId }: DeleteUserProps) {
    await superAdminProcedure();

    await db.delete(accounts).where(eq(accounts.userId, userId)).execute();

    return await db.delete(users).where(eq(users.id, userId)).execute();
}

export async function completeNewUserSetupAction() {
    const { user } = await protectedProcedure();

    return await db
        .update(users)
        .set({ isNewUser: false })
        .where(eq(users.id, user.id))
        .execute();
}
