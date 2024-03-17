"use server";

import { db } from "@/server/db";
import { feedback } from "@/server/db/schema";
import { protectedProcedure } from "@/server/procedures";
import { and, desc, eq } from "drizzle-orm";

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

export async function getUserFeebackByIdQuery({ id }: { id: string }) {
    const { user } = await protectedProcedure();

    if (!id) throw new Error("Invalid feedback id");

    const feedbackData = await db.query.feedback.findFirst({
        where: and(eq(feedback.userId, user.id), eq(feedback.id, id)),
    });

    if (!feedbackData) throw new Error("Feedback not found");

    return feedbackData;
}
