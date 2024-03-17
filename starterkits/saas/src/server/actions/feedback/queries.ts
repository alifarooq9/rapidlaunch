"use server";

import { db } from "@/server/db";
import { feedback } from "@/server/db/schema";
import { adminProcedure, protectedProcedure } from "@/server/procedures";
import { desc, eq } from "drizzle-orm";

/**
 * get all feedback
 * @returns all feedback
 */

export async function getUserFeedbacksQuery() {
    const { user } = await protectedProcedure();

    return await db.query.feedback.findMany({
        orderBy: desc(feedback.createdAt),
        where: eq(feedback.userId, user.id),
    });
}

/**
 * get all feedback
 * @returns all feedback
 * (admin only)
 */

export async function getAllFeedbacksQuery() {
    await adminProcedure();

    return await db.query.feedback.findMany({
        orderBy: desc(feedback.createdAt),
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
}
