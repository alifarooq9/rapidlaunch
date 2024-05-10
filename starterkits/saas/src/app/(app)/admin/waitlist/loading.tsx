import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { waitlistPageConfig } from "@/app/(app)/admin/waitlist/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function WaitlistPageLoading() {
    return (
        <AppPageLoading
            title={waitlistPageConfig.title}
            description={waitlistPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
