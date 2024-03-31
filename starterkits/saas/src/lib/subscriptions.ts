import { UserSubscriptionPlan } from "@/types/billing"
import { enterprisePlan, freePlan, proPlan } from "@/config/subscriptions"
import { getUserBillingQuery } from '@/server/actions/billing/queries'

export async function getUserSubscriptionPlan(): Promise<UserSubscriptionPlan> {
  const billing = await getUserBillingQuery();

  if (!billing) {
    throw new Error("Billing information not found");
  }

  const billing2 = {
    stripeCustomerId: billing.stripeCustomerId,
    stripeSubscriptionId: billing.stripeSubscriptionId,
    stripeCurrentPeriodEnd: billing.stripeCurrentPeriodEnd,
    stripePriceId: billing.stripePriceId ?? freePlan.stripePriceId,
  }

  const isPaid =
    billing.stripePriceId &&
    billing.stripeCurrentPeriodEnd && billing.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()

  let plan;

  if (billing.stripePriceId === proPlan.stripePriceId) {
    plan = proPlan;
  } else if (billing.stripePriceId === enterprisePlan.stripePriceId) {
    plan = enterprisePlan;
  } else {
    plan = freePlan;
  }
 
  return {
    ...plan,
    ...billing2,
    stripeCurrentPeriodEnd: billing.stripeCurrentPeriodEnd ? billing.stripeCurrentPeriodEnd.getTime() : 0,
    isPaid: isPaid as boolean,
  };
}