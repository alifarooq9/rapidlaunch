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
import { getOrgSubscription } from "@/server/actions/plans/query";
import { format } from "date-fns";
import { redirect } from "next/navigation";

export async function CurrentPlan() {
    const subscription = await getOrgSubscription();

    return (
        <Card key={subscription?.id}>
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

                        {subscription?.statusFormatted && (
                            <Badge variant="secondary">
                                {subscription.statusFormatted}
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {subscription ? (
                            <>
                                {subscription.status === "active" &&
                                    "Renews at " +
                                        format(subscription.renewsAt!, "PP")}

                                {subscription.status === "paused" &&
                                    "Your subscription is paused"}

                                {subscription.status === "cancelled" &&
                                    subscription.endsAt &&
                                    `${
                                        new Date(subscription.endsAt) >
                                        new Date()
                                            ? "Ends at "
                                            : "Ended on "
                                    }` + format(subscription.endsAt, "PP")}
                            </>
                        ) : (
                            "No expiration"
                        )}
                    </p>
                </div>

                <div className="flex items-center justify-between">
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
