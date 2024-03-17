import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { userFeedbackPageConfig } from "@/app/(app)/(user)/feedback/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserFeedbackPageLoading() {
    return (
        <AppPageLoading
            title={userFeedbackPageConfig.title}
            description={userFeedbackPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
