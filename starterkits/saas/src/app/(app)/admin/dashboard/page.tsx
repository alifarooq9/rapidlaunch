import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { StatsCard } from "@/app/(app)/admin/dashboard/_components/stats-card";
import { UsersChart } from "@/app/(app)/admin/dashboard/_components/users-chart";
import { adminDashConfig } from "@/app/(app)/admin/dashboard/_constants/page-config";
import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import { cn } from "@/lib/utils";
import { getUsersCount } from "@/server/actions/user/queries";
import { DollarSignIcon, Users2Icon } from "lucide-react";
import Link from "next/link";

export default async function AdminDashPage() {
    const usersCountData = await getUsersCount();

    const usersChartData = usersCountData.usersCountByMonth;

    return (
        <AppPageShell
            title={adminDashConfig.title}
            description={adminDashConfig.description}
        >
            <div className="grid w-full gap-8">
                <p className="text-sm">
                    This a simple dashboard with Analytics, to see detailed
                    Analytics go to{" "}
                    <Link
                        href={siteUrls.admin.analytics}
                        className={cn(
                            buttonVariants({
                                variant: "link",
                                size: "default",
                                className: "px-0 underline",
                            }),
                        )}
                    >
                        PostHog Dashboard
                    </Link>
                </p>

                <div className="grid grid-cols-3 gap-4">
                    <StatsCard
                        title="Users"
                        value={String(usersCountData.totalCount)}
                        Icon={Users2Icon}
                        subText="Total users joined"
                    />

                    <StatsCard
                        title="Revenue"
                        value="$10,000"
                        Icon={DollarSignIcon}
                        subText="Total revenue generated"
                    />

                    <StatsCard
                        title="Subscriptions"
                        value="100"
                        Icon={DollarSignIcon}
                        subText="Total subscriptions made"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <UsersChart data={usersChartData} />
                </div>
            </div>
        </AppPageShell>
    );
}
