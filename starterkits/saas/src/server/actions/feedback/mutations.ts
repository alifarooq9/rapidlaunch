"use server";

import { db } from "@/server/db";
import {
    feedback,
    feedbackInsertSchema,
    feedbackSelectSchema,
} from "@/server/db/schema";
import { adminProcedure, protectedProcedure } from "@/server/procedures";
import { and, eq } from "drizzle-orm";
import type { z } from "zod";

/**
 * Create a new feedback
 * @params title - The title of the feedback
 * @params message - The message of the feedback
 * @params label - The label of the feedback
 */

const feedbackFormSchema = feedbackInsertSchema.pick({
    title: true,
    message: true,
    label: true,
    id: true,
});

type CreateFeedbackProps = z.infer<typeof feedbackFormSchema>;

export async function createFeedbackMutation(props: CreateFeedbackProps) {
    const { user } = await protectedProcedure();

    const feedbackParse = await feedbackFormSchema.safeParseAsync(props);

    if (!feedbackParse.success) {
        throw new Error("Invalid feedback", {
            cause: feedbackParse.error.errors,
        });
    }

    return await db
        .insert(feedback)
        .values({
            userId: user.id,
            ...feedbackParse.data,
        })
        .onConflictDoUpdate({
            target: feedback.id,
            set: feedbackParse.data,
        })
        .execute();
}

/**
 * Remove a feedback
 * @params id - The id of the feedback
 */

export async function removeUserFeedbackMutation({ id }: { id: string }) {
    const { user } = await protectedProcedure();

    if (!id) throw new Error("Invalid feedback id");

    const feedbackData = await db.query.feedback.findFirst({
        where: and(eq(feedback.id, id), eq(feedback.userId, user.id)),
    });

    if (!feedbackData) {
        throw new Error("Feedback not found");
    }

    return await db.delete(feedback).where(eq(feedback.id, id)).execute();
}

/**
 * Update a feedback
 * @params id - The id of the feedback
 * @params status - The status of the feedback
 * @params label - The label of the feedback
 *
 */

const feedbackUpdateSchema = feedbackSelectSchema.pick({
    id: true,
    status: true,
    label: true,
});

type UpdateFeedbackProps = z.infer<typeof feedbackUpdateSchema>;

export async function updateFeedbackMutation(props: UpdateFeedbackProps) {
    await adminProcedure();

    const feedbackParse = await feedbackUpdateSchema.safeParseAsync(props);

    if (!feedbackParse.success) {
        throw new Error("Invalid feedback", {
            cause: feedbackParse.error.errors,
        });
    }

    return await db
        .update(feedback)
        .set(feedbackParse.data)
        .where(eq(feedback.id, feedbackParse.data.id))
        .execute();
}

/**
 * delete feedback by id
 * @params id - The id of the feedback
 */

export async function deleteFeedbackMutation({ id }: { id: string }) {
    await adminProcedure();

    if (!id) throw new Error("Invalid feedback id");

    return await db.delete(feedback).where(eq(feedback.id, id)).execute();
}
