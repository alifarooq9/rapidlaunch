import { CancelPauseResumeBtns } from "@/app/(app)/(user)/org/billing/_components/cancel-pause-resume-btns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { OrgSubscription } from "@/types/org-subscription";
import { format } from "date-fns";
import { redirect } from "next/navigation";

type CurrentPlanProps = {
    subscription: OrgSubscription;
};

export function CurrentPlan({ subscription }: CurrentPlanProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                    Manage and view your current plan
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <p>
                            <span className="font-semibold">Plan:</span>{" "}
                            {subscription ? subscription.plan?.title : "Free"}
                        </p>

                        {subscription?.status_formatted && (
                            <Badge variant="secondary">
                                {subscription.status_formatted}
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {subscription ? (
                            <>
                                {subscription.status === "active" &&
                                    "Renews at " +
                                        format(subscription.renews_at, "PP")}

                                {subscription.status === "paused" &&
                                    "Your subscription is paused"}

                                {subscription.status === "cancelled" &&
                                    subscription.ends_at &&
                                    `${
                                        new Date(subscription.ends_at) >
                                        new Date()
                                            ? "Ends at "
                                            : "Ended on "
                                    }` + format(subscription.ends_at, "PP")}
                            </>
                        ) : (
                            "No expiration"
                        )}
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <form
                        action={async () => {
                            "use server";

                            if (subscription?.customerPortalUrl) {
                                redirect(subscription?.customerPortalUrl);
                            }
                        }}
                    >
                        <Button disabled={!subscription} variant="outline">
                            Manage your billing settings
                        </Button>
                    </form>

                    <CancelPauseResumeBtns subscription={subscription} />
                </div>
            </CardContent>
        </Card>
    );
}
