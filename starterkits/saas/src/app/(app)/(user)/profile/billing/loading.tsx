import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { profileSettingsPageConfig } from "@/app/(app)/(user)/profile/settings/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function ProfileSettingsLoading() {
    return (
        <AppPageLoading
            title={profileSettingsPageConfig.title}
            description={profileSettingsPageConfig.description}
        >
            <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="h-10" />
      <CardFooter>
        <Skeleton className="h-8 w-[120px]" />
      </CardFooter>
    </Card>
        </AppPageLoading>
    );
}
