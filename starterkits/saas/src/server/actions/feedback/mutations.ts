"use server";

import { db } from "@/server/db";
import {
    feedback,
    feedbackInsertSchema,
    feedbackSelectSchema,
} from "@/server/db/schema";
import { protectedProcedure } from "@/server/procedures";
import { eq } from "drizzle-orm";
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

export async function removeFeedbackMutation({ id }: { id: string }) {
    await protectedProcedure();

    if (!id) throw new Error("Invalid feedback id");

    return await db.delete(feedback).where(eq(feedback.id, id)).execute();
}

/**
 * Update a feedback
 * @params id - The id of the feedback
 * @params title - The title of the feedback
 * @params message - The message of the feedback
 * @params label - The label of the feedback
 */

const feedbackUpdateSchema = feedbackSelectSchema.pick({
    title: true,
    message: true,
    label: true,
    id: true,
});

type UpdateFeedbackProps = z.infer<typeof feedbackUpdateSchema>;

export async function updateFeedbackMutation(props: UpdateFeedbackProps) {
    const { user } = await protectedProcedure();

    const feedbackParse = await feedbackUpdateSchema.safeParseAsync(props);

    if (!feedbackParse.success) {
        throw new Error("Invalid feedback", {
            cause: feedbackParse.error.errors,
        });
    }

    const feedbackData = await db.query.feedback.findFirst({
        where: eq(feedback.id, feedbackParse.data.id),
    });

    if (feedbackData?.userId !== user.id) {
        throw new Error("You are not allowed to update this feedback");
    }

    if (!feedbackData) {
        throw new Error("Feedback not found");
    }

    return await db
        .update(feedback)
        .set(feedbackParse.data)
        .where(eq(feedback.id, feedbackParse.data.id))
        .execute();
}
