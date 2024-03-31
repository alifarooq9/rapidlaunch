import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { profileSettingsPageConfig } from "@/app/(app)/(user)/profile/billing/_constants/page-config";
import { getUser } from "@/server/auth";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { stripe } from "@/lib/stripe";
import { BillingForm } from "@/app/(app)/(user)/profile/billing/_components/billing-form";

/**
 * This is the settings page for the user profile.
 * @add more settings related components here
 */

export default async function BillingPage() {
  const user = await getUser();

  const subscriptionPlan = await getUserSubscriptionPlan()

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPaid && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <AppPageShell
      title={profileSettingsPageConfig.title}
      description={profileSettingsPageConfig.description}
    >
      <div className="grid gap-4">
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </AppPageShell>
  );
}
