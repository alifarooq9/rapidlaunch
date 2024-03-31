"use server";

import { db } from "@/server/db";
import {
    billing,
    billingInsertSchema,
    billingSelectSchema,
} from "@/server/db/schema";
import { protectedProcedure } from "@/server/procedures";
import { and, eq } from "drizzle-orm";
import type { z } from "zod";

/**
 * Create a new billing
 * @params stripeCustomerId - The stripeCustomerId of the billing
 * @params stripeSubscriptionId - The stripeSubscriptionId of the billing
 */

const billingFormSchema = billingInsertSchema.pick({
    stripeCustomerId: true,
    stripeSubscriptionId: true,
    id: true,
});

type CreateBillingProps = z.infer<typeof billingFormSchema>;

export async function createBillingMutation(props: CreateBillingProps) {
    const { user } = await protectedProcedure();

    const billingParse = await billingFormSchema.safeParseAsync(props);

    if (!billingParse.success) {
        throw new Error("Invalid billing", {
            cause: billingParse.error.errors,
        });
    }

    return await db
        .insert(billing)
        .values({
            userId: user.id,
            ...billingParse.data,
        })
        .onConflictDoUpdate({
            target: billing.id,
            set: billingParse.data,
        })
        .execute();
}

/**
 * checkout.session.completed
 * @params stripeCustomerId - The stripeCustomerId of the billing
 * @params stripeSubscriptionId - The stripeSubscriptionId of the billing
 * @params stripePriceId - The stripePriceId of the billing
 * @params stripeCurrentPeriodEnd - The stripeCurrentPeriodEnd of the billing
 */


const billingUpdateSchema = billingSelectSchema.pick({
    stripeCustomerId: true,
    stripeSubscriptionId: true,
    stripePriceId: true,
    stripeCurrentPeriodEnd: true,
    userId: true,
});

type UpdateBillingProps = z.infer<typeof billingUpdateSchema>;

export async function updateBillingMutation(props: UpdateBillingProps) {

    const billingParse = await billingUpdateSchema.safeParseAsync(props);

    if (!billingParse.success) {
        throw new Error("Invalid billing", {
            cause: billingParse.error.errors,
        });
    }

    // need to convert billing.data.stripeCurrentPeriodEnd to a date using new Date( subscription.current_period_end * 1000),
    const fixedBilling = {
        ...billingParse.data,
        stripeCurrentPeriodEnd: new Date(
            billingParse.data.stripeCurrentPeriodEnd || 0 * 1000 
        ),
    };
    return await db
        .update(billing)
        .set(fixedBilling)
        .where(and(eq(billing.userId, billingParse.data.userId)))
        .execute();
}


/**
 * invoice.payment_succeeded
 * @params stripePriceId - The stripePriceId of the billing
 * @params stripeCurrentPeriodEnd - The stripeCurrentPeriodEnd of the billing
 */

export async function updateBilling2Mutation({
    stripeCustomerId,
    stripePriceId,
    stripeCurrentPeriodEnd,
}: {
    stripeCustomerId: string;
    stripePriceId: string;
    stripeCurrentPeriodEnd: number;
}) {

    return await db
        .update(billing)
        .set({
            stripePriceId,
            stripeCurrentPeriodEnd: new Date(stripeCurrentPeriodEnd),
        })
        .where(and(eq(billing.stripeCustomerId, stripeCustomerId)))
        .execute();
}
