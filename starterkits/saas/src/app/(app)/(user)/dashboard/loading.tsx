import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { dashboardPageConfig } from "@/app/(app)/(user)/dashboard/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <AppPageLoading
            title={dashboardPageConfig.title}
            description={dashboardPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
