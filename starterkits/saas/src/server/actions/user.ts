"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { protectedProcedure } from "../procedures";

type UpdateNameProps = {
    name: string;
};

export async function updateName({ name }: UpdateNameProps) {
    const { user } = await protectedProcedure();

    return await db
        .update(users)
        .set({ name })
        .where(eq(users.email, user.email!))
        .execute();
}
