import { Skeleton } from "@/components/ui/skeleton";

export default function OrgRequestPageLoading() {
    return (
        <div className="container flex min-h-screen flex-col items-center justify-center">
            <Skeleton className="h-52 w-screen max-w-sm" />
        </div>
    );
}
