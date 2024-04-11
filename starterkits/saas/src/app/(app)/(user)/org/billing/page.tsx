import { AvailablePlans } from "@/app/(app)/(user)/org/billing/_components/available-plans";
import { CurrentPlan } from "@/app/(app)/(user)/org/billing/_components/current-plan";
import { AppPageShell } from "@/app/(app)/_components/page-shell";

export default async function OrgBillingPage() {
    return (
        <AppPageShell
            title="Billing"
            description="Manage your billing information"
        >
            <div className="w-full space-y-5">
                <CurrentPlan />

                <AvailablePlans />
            </div>
        </AppPageShell>
    );
}
