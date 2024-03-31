"use server";

import { db } from "@/server/db";
import { billing } from "@/server/db/schema";
import { protectedProcedure } from "@/server/procedures";
import { eq } from "drizzle-orm";

/**
 * Get billing details of a user
 * 
 */

export async function getUserBillingQuery() {
    const { user } = await protectedProcedure();

    return (
        await db.query.billing
            .findFirst({
                where: eq(billing.userId, user.id),
            })
    );
}
/**
 * @purpose Get billing by userid 
 * @param userId
 * @returns billing
 */

export async function getUserBillingQueryById(userId: string) {
    return (
        await db.query.billing
            .findFirst({
                where: eq(billing.userId, userId),
            })
    );
}