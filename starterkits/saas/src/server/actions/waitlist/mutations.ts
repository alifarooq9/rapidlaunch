"use server";
import { waitlistUsers, waitlistUsersSchema } from "@/server/db/schema";
import { type z } from "zod";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

type AddUserToWaitlistMutationProps = z.infer<typeof waitlistUsersSchema>;

export async function addUserToWaitlistMutation({
    name,
    email,
}: AddUserToWaitlistMutationProps) {
    const parseData = await waitlistUsersSchema.safeParseAsync({
        name,
        email,
    });

    if (!parseData.success) {
        return {
            success: false,
            error: parseData.error.message,
        };
    }

    const { data } = parseData;

    try {
        await db
            .insert(waitlistUsers)
            .values(data)
            .onConflictDoUpdate({
                target: waitlistUsers.email,
                set: { name: data.name },
            })
            .execute();

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error: "Something went wrong, please try again later",
        };
    }
}

export async function deleteWaitlistUserMutation({ id }: { id: string }) {
    try {
        await db
            .delete(waitlistUsers)
            .where(eq(waitlistUsers.id, id))
            .execute();

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            error: "Something went wrong, please try again later",
        };
    }
}
