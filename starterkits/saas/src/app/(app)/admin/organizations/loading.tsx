import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { organizationsPageConfig } from "@/app/(app)/admin/organizations/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrganizationsPageLoading() {
    return (
        <AppPageLoading
            title={organizationsPageConfig.title}
            description={organizationsPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
