"use server";

import { pricingPlans } from "@/config/pricing";
import { getOrgSubscription } from "@/server/actions/subscription/query";
import { db } from "@/server/db";
import { subscriptions, webhookEvents } from "@/server/db/schema";
import { configureLemonSqueezy } from "@/server/lemonsqueezy";
import { webhookHasData, webhookHasMeta } from "@/validations/lemonsqueezy";
import {
    cancelSubscription,
    updateSubscription,
} from "@lemonsqueezy/lemonsqueezy.js";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type NewWebhookEvent = typeof webhookEvents.$inferInsert;
type NewSubscription = typeof subscriptions.$inferInsert;

export async function storeWebhookEvent(
    eventName: string,
    body: NewWebhookEvent["body"],
) {
    const returnedValue = await db
        .insert(webhookEvents)
        .values({
            eventName,
            processed: false,
            body,
        })
        .returning();

    return returnedValue[0];
}

/**
 * Processes a webhook event and updates the corresponding data in the database.
 * @param webhookEvent - The webhook event to process.
 * @returns A Promise that resolves when the processing is complete.
 * @throws An error if the webhook event is not found in the database or if there is an error during processing.
 */
export async function processWebhookEvent(webhookEvent: NewWebhookEvent) {
    configureLemonSqueezy();

    const dbwebhookEvent = await db
        .select()
        .from(webhookEvents)
        .where(eq(webhookEvents.id, webhookEvent.id!));

    if (dbwebhookEvent.length < 1) {
        throw new Error(
            `Webhook event #${webhookEvent.id} not found in the database.`,
        );
    }

    let processingError = "";
    const eventBody = webhookEvent.body;

    if (!webhookHasMeta(eventBody)) {
        processingError = "Event body is missing the 'meta' property.";
    } else if (webhookHasData(eventBody)) {
        if (webhookEvent.eventName.startsWith("subscription_payment_")) {
            // Save subscription invoices; eventBody is a SubscriptionInvoice
            // Not implemented.
        } else if (webhookEvent.eventName.startsWith("subscription_")) {
            // Save subscription events; obj is a Subscription
            const attributes = eventBody.data.attributes;
            const variantId = attributes.variant_id as string;

            // We assume that the Plan table is up to date.
            const plan = pricingPlans.find(
                (p) =>
                    p.variantId?.monthly === Number(variantId) ||
                    p.variantId?.yearly === Number(variantId),
            );

            if (!plan) {
                processingError = `Plan with variantId ${variantId} not found.`;
            } else {
                // Update the subscription in the database.

                const updateData: NewSubscription = {
                    lemonSqueezyId: eventBody.data.id,
                    orderId: attributes.order_id as number,
                    orgId: eventBody.meta.custom_data.org_id,
                    variantId: Number(variantId),
                };

                // Create/update subscription in the database.
                try {
                    await db
                        .insert(subscriptions)
                        .values(updateData)
                        .onConflictDoUpdate({
                            target: subscriptions.lemonSqueezyId,
                            set: updateData,
                        });
                } catch (error) {
                    processingError = `Failed to upsert Subscription #${updateData.lemonSqueezyId} to the database.`;
                    console.error(error);
                }
            }
        } else if (webhookEvent.eventName.startsWith("order_")) {
            // Save orders; eventBody is a "Order"
            /* Not implemented */
        } else if (webhookEvent.eventName.startsWith("license_")) {
            // Save license keys; eventBody is a "License key"
            /* Not implemented */
        }

        // Update the webhook event in the database.
        await db
            .update(webhookEvents)
            .set({
                processed: true,
                processingError,
            })
            .where(eq(webhookEvents.id, webhookEvent.id!));
    }
}

/**
 * This action will change the plan of a subscription on Lemon Squeezy.
 */
export async function changePlan(
    currentVariantId: number,
    newVariantId: number,
) {
    configureLemonSqueezy();

    // Get user subscriptions
    const subscription = await getOrgSubscription();

    if (!subscription) {
        throw new Error(
            `No subscription with plan id #${currentVariantId} was found.`,
        );
    }

    // Send request to Lemon Squeezy to change the subscription.
    const updatedSub = await updateSubscription(subscription.lemonSqueezyId, {
        variantId: newVariantId,
        invoiceImmediately: true,
        // @ts-expect-error -- null is a valid value for pause
        pause: null,
        cancelled: false,
    });

    // Save in db
    try {
        await db
            .update(subscriptions)
            .set({
                lemonSqueezyId: updatedSub.data?.data.id,
                variantId: newVariantId,
            })
            .where(
                eq(subscriptions.lemonSqueezyId, subscription.lemonSqueezyId),
            );
    } catch (error) {
        throw new Error(
            `Failed to update Subscription #${subscription.lemonSqueezyId} in the database.`,
        );
    }

    revalidatePath("/");

    return updatedSub;
}

export async function cancelPlan() {
    configureLemonSqueezy();

    const subscription = await getOrgSubscription();

    if (!subscription) {
        throw new Error("No subscription found.");
    }

    const cancelSub = await cancelSubscription(subscription.lemonSqueezyId);

    // Save in db
    try {
        await db
            .update(subscriptions)
            .set({
                lemonSqueezyId: cancelSub.data?.data.id,
                variantId: cancelSub.data?.data.attributes.variant_id,
            })
            .where(
                eq(subscriptions.lemonSqueezyId, subscription.lemonSqueezyId),
            );
    } catch (error) {
        throw new Error(
            `Failed to update Subscription #${subscription.lemonSqueezyId} in the database.`,
        );
    }

    revalidatePath("/");

    return cancelSub;
}

export async function pausePlan() {
    configureLemonSqueezy();

    const subscription = await getOrgSubscription();

    if (!subscription) {
        throw new Error("No subscription found.");
    }

    const returnedSub = await updateSubscription(subscription.lemonSqueezyId, {
        pause: {
            mode: "void",
        },
    });

    // Update the db
    try {
        await db
            .update(subscriptions)
            .set({
                lemonSqueezyId: returnedSub.data?.data.id,
                variantId: returnedSub.data?.data.attributes.variant_id,
            })
            .where(
                eq(subscriptions.lemonSqueezyId, subscription.lemonSqueezyId),
            );
    } catch (error) {
        throw new Error(
            `Failed to pause Subscription #${subscription.lemonSqueezyId} in the database.`,
        );
    }

    revalidatePath("/");

    return returnedSub;
}

export async function resumePlan() {
    configureLemonSqueezy();

    const subscription = await getOrgSubscription();

    if (!subscription) {
        throw new Error("No subscription found.");
    }

    const returnedSub = await updateSubscription(subscription.lemonSqueezyId, {
        cancelled: false,
        // @ts-expect-error -- null is a valid value for pause
        pause: null,
    });

    // Update the db
    try {
        await db
            .update(subscriptions)
            .set({
                lemonSqueezyId: returnedSub.data?.data.id,
                variantId: returnedSub.data?.data.attributes.variant_id,
            })
            .where(
                eq(subscriptions.lemonSqueezyId, subscription.lemonSqueezyId),
            );
    } catch (error) {
        throw new Error(
            `Failed to resume Subscription #${subscription.lemonSqueezyId} in the database.`,
        );
    }

    revalidatePath("/");

    return returnedSub;
}
