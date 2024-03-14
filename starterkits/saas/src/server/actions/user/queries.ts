"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { adminProcedure } from "@/server/procedures";
import { desc } from "drizzle-orm";

/**
 * Get all users
 * @returns All users
 */

export async function getAllUsersQuery() {
    await adminProcedure();

    return await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
    });
}
