import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { orgSettingsPageConfig } from "@/app/(app)/(user)/org/settings/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrgSettingsLoading() {
    return (
        <AppPageLoading
            title={orgSettingsPageConfig.title}
            description={orgSettingsPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
