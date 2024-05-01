import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { StatsCard } from "@/app/(app)/admin/dashboard/_components/stats-card";
import { UsersChart } from "@/app/(app)/admin/dashboard/_components/users-chart";
import { adminDashConfig } from "@/app/(app)/admin/dashboard/_constants/page-config";
import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { DollarSignIcon, Users2Icon } from "lucide-react";
import Link from "next/link";

const data = [
    { Date: formatDate("2023-01-01"), Users: 1000, "Active Users": 100 },
    { Date: formatDate("2023-02-01"), Users: 1040, "Active Users": 120 },
    { Date: formatDate("2023-03-01"), Users: 1190, "Active Users": 140 },
    { Date: formatDate("2023-04-01"), Users: 1340, "Active Users": 160 },
    { Date: formatDate("2023-05-01"), Users: 1390, "Active Users": 180 },
    { Date: formatDate("2023-06-01"), Users: 1440, "Active Users": 200 },
    { Date: formatDate("2023-07-01"), Users: 1490, "Active Users": 220 },
    { Date: formatDate("2023-08-01"), Users: 1540, "Active Users": 240 },
    { Date: formatDate("2023-09-01"), Users: 1890, "Active Users": 260 },
    { Date: formatDate("2023-10-01"), Users: 2040, "Active Users": 280 },
    { Date: formatDate("2023-11-01"), Users: 4000, "Active Users": 300 },
    { Date: formatDate("2023-12-01"), Users: 10040, "Active Users": 320 },
    { Date: formatDate("2024-01-01"), Users: 19090, "Active Users": 340 },
    { Date: formatDate("2024-02-01"), Users: 25040, "Active Users": 360 },
];

export default async function AdminDashPage() {
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
                        title="Total Users"
                        value="1000"
                        Icon={Users2Icon}
                        subText="+20.1% from last month"
                    />

                    <StatsCard
                        title="Total Revenue"
                        value="$10,000"
                        Icon={DollarSignIcon}
                        subText="+20.1% from last month"
                    />

                    <StatsCard
                        title="Total Subscriptions"
                        value="100"
                        Icon={DollarSignIcon}
                        subText="+20.1% from last month"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <UsersChart data={data} />
                </div>
            </div>
        </AppPageShell>
    );
}
