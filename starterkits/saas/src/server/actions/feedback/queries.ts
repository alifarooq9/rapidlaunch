"use server";

import { db } from "@/server/db";
import { feedback } from "@/server/db/schema";
import { adminProcedure, protectedProcedure } from "@/server/procedures";
import { unstable_noStore as noStore } from "next/cache";
import { asc, count, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { z } from "zod";

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

const panginatedFeedbackPropsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    title: z.string().optional(),
    label: z.string().optional(),
    status: z.string().optional(),
    operator: z.string().optional(),
});

type GetPaginatedFeedbackQueryProps = z.infer<
    typeof panginatedFeedbackPropsSchema
>;

export async function getAllPaginatedFeedbacksQuery(
    input: GetPaginatedFeedbackQueryProps,
) {
    noStore();
    await adminProcedure();

    const offset = (input.page - 1) * input.per_page;

    const [column, order] = (input.sort?.split(".") as [
        keyof typeof feedback.$inferSelect | undefined,
        "asc" | "desc" | undefined,
    ]) ?? ["title", "desc"];

    const labels =
        (input.label?.split(".") as (typeof feedback.$inferSelect.label)[]) ??
        [];

    const statuses =
        (input.status?.split(".") as (typeof feedback.$inferSelect.status)[]) ??
        [];
    const { data, total } = await db.transaction(async (tx) => {
        const data = await tx.query.feedback.findMany({
            orderBy:
                column && column in feedback
                    ? order === "asc"
                        ? asc(feedback[column])
                        : desc(feedback[column])
                    : desc(feedback.createdAt),
            offset,
            limit: input.per_page,
            where: or(
                input.title
                    ? ilike(feedback.title, `%${input.title}%`)
                    : undefined,

                labels.length > 0 ? inArray(feedback.label, labels) : undefined,

                statuses.length > 0
                    ? inArray(feedback.status, statuses)
                    : undefined,
            ),
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

        const total = await tx
            .select({
                count: count(),
            })
            .from(feedback)
            .where(
                or(
                    input.title
                        ? ilike(feedback.title, `%${input.title}%`)
                        : undefined,

                    labels.length > 0
                        ? inArray(feedback.label, labels)
                        : undefined,

                    statuses.length > 0
                        ? inArray(feedback.status, statuses)
                        : undefined,
                ),
            )
            .execute()
            .then((res) => res[0]?.count ?? 0);

        return { data, total };
    });

    const pageCount = Math.ceil(total / input.per_page);

    return { data, pageCount, total };
}
