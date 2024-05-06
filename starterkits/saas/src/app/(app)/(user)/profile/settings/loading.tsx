import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { profileSettingsPageConfig } from "@/app/(app)/(user)/profile/settings/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSettingsLoading() {
    return (
        <AppPageLoading
            title={profileSettingsPageConfig.title}
            description={profileSettingsPageConfig.description}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-60 w-full" />
            </div>
        </AppPageLoading>
    );
}
