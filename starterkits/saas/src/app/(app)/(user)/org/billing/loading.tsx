import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { Skeleton } from "@/components/ui/skeleton";
import { orgBillingPageConfig } from "@/app/(app)/(user)/org/billing/_constants/page-config";

export default function OrgBillingLoading() {
    return (
        <AppPageLoading
            title={orgBillingPageConfig.title}
            description={orgBillingPageConfig.description}
        >
            <div className="grid gap-5">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        </AppPageLoading>
    );
}
