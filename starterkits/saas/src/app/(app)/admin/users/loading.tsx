import { AppPageLoading } from "@/app/(app)/_components/page-loading";
import { usersPageConfig } from "@/app/(app)/admin/users/_constants/page-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersPageLoading() {
    return (
        <AppPageLoading
            title={usersPageConfig.title}
            description={usersPageConfig.description}
        >
            <Skeleton className="h-96 w-full" />
        </AppPageLoading>
    );
}
