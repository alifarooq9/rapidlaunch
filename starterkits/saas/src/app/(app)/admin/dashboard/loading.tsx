import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { adminDashConfig } from "@/app/(app)/admin/dashboard/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminFeedbackPageLoading() {
    return (
        <AppPageLoading
            title={adminDashConfig.title}
            description={adminDashConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
