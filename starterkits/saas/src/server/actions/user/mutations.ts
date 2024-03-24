"use server";
import { db } from "@/server/db";
import { accounts, userInsertSchema, users } from "@/server/db/schema";
import { protectedProcedure, superAdminProcedure } from "@/server/procedures";
import { eq } from "drizzle-orm";
import type { z } from "zod";

/**
 * Update the name of the user
 * @param name The new name
 */

const updateNameSchema = userInsertSchema.pick({ name: true });

type UpdateNameProps = z.infer<typeof updateNameSchema>;

export async function updateNameMutation({ name }: UpdateNameProps) {
    const { user } = await protectedProcedure();

    const updateNameParse = await updateNameSchema.safeParseAsync({ name });

    if (!updateNameParse.success) {
        throw new Error("Invalid name", {
            cause: updateNameParse.error.errors,
        });
    }

    return await db
        .update(users)
        .set({ name: updateNameParse.data.name })
        .where(eq(users.id, user.id))
        .execute();
}

/**
 * Update the image of the user
 * @param image The new image
 */

const updateImageSchema = userInsertSchema.pick({ image: true });

type UpdateImageProps = z.infer<typeof updateImageSchema>;

export async function updateImageMutation({ image }: UpdateImageProps) {
    const { user } = await protectedProcedure();

    const updateImageParse = await updateImageSchema.safeParseAsync({ image });

    if (!updateImageParse.success) {
        throw new Error("Invalid image", {
            cause: updateImageParse.error.errors,
        });
    }

    return await db
        .update(users)
        .set({ image: updateImageParse.data.image })
        .where(eq(users.email, user.email!))
        .execute();
}

/**
 * Update the role of a user (super admin only)
 * @param id The user id
 * @param role The new role
 */

const updateRoleSchema = userInsertSchema.pick({
    role: true,
    id: true,
});

type UpdateRoleProps = z.infer<typeof updateRoleSchema>;

export async function updateRoleMutation({ role, id }: UpdateRoleProps) {
    await superAdminProcedure();

    const updateRoleParse = await updateRoleSchema.safeParseAsync({ role, id });

    if (!updateRoleParse.success) {
        throw new Error("Invalid role data", {
            cause: updateRoleParse.error.errors,
        });
    }

    return await db
        .update(users)
        .set({ role: updateRoleParse.data.role })
        .where(eq(users.id, updateRoleParse.data.id))
        .execute();
}

/**
 * Delete a user (super admin only)
 * @param id The user id
 */

const deleteUserSchema = userInsertSchema.pick({ id: true });

type DeleteUserProps = z.infer<typeof deleteUserSchema>;

export async function deleteUserMutation({ id }: DeleteUserProps) {
    await superAdminProcedure();

    const deleteUserParse = await deleteUserSchema.safeParseAsync({ id });

    if (!deleteUserParse.success) {
        throw new Error("Invalid user id", {
            cause: deleteUserParse.error.errors,
        });
    }

    await db
        .delete(accounts)
        .where(eq(accounts.userId, deleteUserParse.data.id))
        .execute();

    return await db
        .delete(users)
        .where(eq(users.id, deleteUserParse.data.id))
        .execute();
}

/**
 *  complete new user setup
 * @returns
 */

export async function completeNewUserSetupMutation() {
    const { user } = await protectedProcedure();

    return await db
        .update(users)
        .set({ isNewUser: false })
        .where(eq(users.id, user.id))
        .execute();
}
