import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { adminFeedbackPageConfig } from "@/app/(app)/admin/feedbacks/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminFeedbackPageLoading() {
    return (
        <AppPageLoading
            title={adminFeedbackPageConfig.title}
            description={adminFeedbackPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
