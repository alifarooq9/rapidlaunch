import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { RevenueChart } from "@/app/(app)/admin/dashboard/_components/revenue-chart";
import { StatsCard } from "@/app/(app)/admin/dashboard/_components/stats-card";
import { SubsChart } from "@/app/(app)/admin/dashboard/_components/subs-chart";
import { UsersChart } from "@/app/(app)/admin/dashboard/_components/users-chart";
import { adminDashConfig } from "@/app/(app)/admin/dashboard/_constants/page-config";
import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import { cn } from "@/lib/utils";
import {
    getRevenueCount,
    getSubscriptionsCount,
} from "@/server/actions/subscription/query";
import { getUsersCount } from "@/server/actions/user/queries";
import {
    DollarSignIcon,
    UserRoundCheckIcon,
    UserRoundPlusIcon,
    Users2Icon,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashPage() {
    const usersCountData = await getUsersCount();
    const usersChartData = usersCountData.usersCountByMonth;

    const subscriptionsCountData = await getSubscriptionsCount({});

    const activeSubscriptionsCountData = await getSubscriptionsCount({
        status: "active",
    });
    const subsChartData = subscriptionsCountData.subscriptionsCountByMonth;

    const revenueCountData = await getRevenueCount();
    const revenueChartData = revenueCountData.revenueCountByMonth;

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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Users"
                        value={String(usersCountData.totalCount)}
                        Icon={Users2Icon}
                        subText="Total users joined"
                    />

                    <StatsCard
                        title="Revenue"
                        value={revenueCountData.totalRevenue}
                        Icon={DollarSignIcon}
                        subText="Total revenue generated"
                    />

                    <StatsCard
                        title="Subscriptions"
                        value={String(subscriptionsCountData.totalCount)}
                        Icon={UserRoundPlusIcon}
                        subText="Total subscriptions made"
                    />

                    <StatsCard
                        title="Active Subscriptions"
                        value={String(activeSubscriptionsCountData.totalCount)}
                        Icon={UserRoundCheckIcon}
                        subText="Current active subscriptions"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <UsersChart data={usersChartData} />

                    <SubsChart data={subsChartData} />

                    <RevenueChart data={revenueChartData} />
                </div>
            </div>
        </AppPageShell>
    );
}
