import { headers } from "next/headers"
import Stripe from "stripe"
import { env } from "@/env"

import { stripe } from "@/lib/stripe"
import { updateBilling2Mutation, updateBillingMutation } from "@/server/actions/billing/mutations"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    const Error = error as Error
    console.log(error)
    return new Response(`Webhook Error: ${Error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const session2 = event.data.object as Stripe.BillingPortal.Session

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await updateBillingMutation({
      userId: session.metadata.userId as string,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0]?.price.id as string,
      stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the user using the mutation.
    // This will update the priceid and currentend in the database.
    await updateBilling2Mutation({
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0]?.price.id as string,
      stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
    })
  }

  if (event.type === "customer.subscription.updated") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.list({
      limit: 1,
      customer: session2.customer as string,
    })

    // take the first subscription
    const subscription2 = subscription.data[0]

    console.log(subscription2)

    // Update the user using the mutation.
    // This will update the priceid and currentend in the database.
    await updateBilling2Mutation({
      stripeCustomerId: subscription2?.customer as string,
      stripePriceId: subscription2?.items.data[0]?.price.id as string,
      stripeCurrentPeriodEnd: subscription2?.current_period_end * 1000,
    })
  }

  return new Response(null, { status: 200 })
}

export async function GET() {
  return new Response("Stripe Webhook", { status: 200 })
}