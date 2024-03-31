import { z } from "zod"
import { enterprisePlan } from "@/config/subscriptions"
import { stripe } from "@/lib/stripe"
import { getUser } from "@/server/auth";
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { getAbsoluteUrl } from "@/lib/utils"
import { env } from "@/env"

const billingUrl = getAbsoluteUrl("/profile/billing")

export async function GET(req: Request) {
    try {
        const user = await getUser();

        if (!user) {
            return new Response(null, { status: 401 })
        }
        const subscriptionPlan = await getUserSubscriptionPlan()

        // The user is on the pro plan.
        // Create a portal session to manage subscription.
        if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: subscriptionPlan.stripeCustomerId,
                return_url: billingUrl,
                configuration: env.STRIPE_CONFIGURATION,
                        
            })

            return new Response(JSON.stringify({ url: stripeSession.url }))
        }

        // The user is on the free plan.
        // Create a checkout session to upgrade.
        if (!billingUrl || !user.email) {
            throw new Error('Billing URL or user email is missing');
        }

        // choose price to upgrade to

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: billingUrl,
            cancel_url: billingUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.email,
            line_items: [
                {
                    price: enterprisePlan.stripePriceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.id,
            },
        });

        return new Response(JSON.stringify({ url: stripeSession.url }))
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 })
        }

        return new Response(null, { status: 500 })
    }
}