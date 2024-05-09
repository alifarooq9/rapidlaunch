"use server";
import { waitlistUsers, waitlistUsersSchema } from "@/server/db/schema";
import { type z } from "zod";
import { db } from "@/server/db";

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
