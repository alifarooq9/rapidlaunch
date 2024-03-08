import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { Skeleton } from "@/components/ui/skeleton";
import { orgMembersPageConfig } from "@/app/(app)/(user)/org/members/_constants/page-config";

export default function OrgMembersLoading() {
    return (
        <AppPageLoading
            title={orgMembersPageConfig.title}
            description={orgMembersPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
