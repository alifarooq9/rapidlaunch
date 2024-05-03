import { AvailablePlans } from "@/app/(app)/(user)/org/billing/_components/available-plans";
import { CurrentPlan } from "@/app/(app)/(user)/org/billing/_components/current-plan";
import { orgBillingPageConfig } from "@/app/(app)/(user)/org/billing/_constants/page-config";
import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { getOrgSubscription } from "@/server/actions/subscription/query";

export const dynamic = "force-dynamic";

export default async function OrgBillingPage() {
    const subscription = await getOrgSubscription();

    return (
        <AppPageShell
            title={orgBillingPageConfig.title}
            description={orgBillingPageConfig.description}
        >
            <div className="w-full space-y-5">
                <CurrentPlan subscription={subscription} />

                <AvailablePlans subscription={subscription} />
            </div>
        </AppPageShell>
    );
}
