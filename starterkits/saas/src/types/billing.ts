import { users, billing } from "@/server/db/schema"

export type SubscriptionPlan = {
    name: string
    description: string
    stripePriceId: string
}

export type Subscription = {
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string
    isPaid: boolean
    stripeCurrentPeriodEnd: number
}

export type User = typeof users;

export type Billing = Pick<typeof billing, "stripeCustomerId" | "stripeSubscriptionId"> & {
    user: User
}



export type UserSubscriptionPlan = SubscriptionPlan & Subscription