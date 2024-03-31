import { SubscriptionPlan } from "@/types/billing"
import { env } from "@/env"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to ... Upgrade to the PRO plan for ...",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "Professional",
  description: "The Professional plan offers many additional features such as ...",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}

export const enterprisePlan: SubscriptionPlan = {
  name: "Enterprise",
  description: "The Enterprise plan offers many additional features such as ...",
  stripePriceId: env.STRIPE_ENTERPRISE_MONTHLY_PLAN_ID || "",
}