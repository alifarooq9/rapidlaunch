import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { orgSettingsPageConfig } from "@/app/(app)/(user)/org/settings/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrgSettingsLoading() {
    return (
        <AppPageLoading
            title={orgSettingsPageConfig.title}
            description={orgSettingsPageConfig.description}
        >
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-60 w-full" />
            </div>
        </AppPageLoading>
    );
}
