import { SubscribeBtn } from "@/app/(app)/(user)/org/billing/_components/subscribe-btn";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { features, pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";
import { getOrgSubscription } from "@/server/actions/plans/query";
import { CheckIcon, XIcon } from "lucide-react";

export async function AvailablePlans() {
    const subscription = await getOrgSubscription();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Available Plans</CardTitle>
                <CardDescription>
                    View available plans and change subscription
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-5">
                    {pricingPlans.map((plan) => (
                        <div key={plan.id} className="space-y-4">
                            <CardTitle>{plan.title}</CardTitle>
                            <CardDescription>
                                {plan.description}
                            </CardDescription>
                            <ul className="space-y-1">
                                {plan.uniqueFeatures?.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center text-sm font-light"
                                    >
                                        <CheckIcon className="mr-1 h-4 w-4" />
                                        {feature}
                                    </li>
                                ))}

                                {features.map((feature) => (
                                    <li
                                        key={feature.id}
                                        className={cn(
                                            "flex items-center text-sm font-light",
                                            !feature.inludedIn.includes(
                                                plan.id,
                                            ) && "text-muted-foreground/70",
                                        )}
                                    >
                                        {feature.inludedIn.includes(plan.id) ? (
                                            <CheckIcon className="mr-1 h-4 w-4" />
                                        ) : (
                                            <XIcon className="mr-1 h-4 w-4 text-muted-foreground/70" />
                                        )}
                                        {feature.title}
                                    </li>
                                ))}
                            </ul>

                            {plan.id === subscription?.plan?.id ? (
                                <Button
                                    variant="outline"
                                    disabled
                                    className="w-full"
                                >
                                    Current Plan
                                </Button>
                            ) : (
                                plan.variantId && (
                                    <div className="flex w-full flex-col gap-2">
                                        <SubscribeBtn
                                            variant={"outline"}
                                            variantId={plan.variantId?.monthly}
                                            className="w-full"
                                        >
                                            Switch to {plan.currency.symbol}
                                            {plan.price.monthly}{" "}
                                            {plan.currency.code} per month
                                        </SubscribeBtn>
                                        <SubscribeBtn
                                            variant={"outline"}
                                            variantId={plan.variantId?.yearly}
                                            className="w-full"
                                        >
                                            Switch to {plan.currency.symbol}
                                            {plan.price.yearly}{" "}
                                            {plan.currency.code} per year
                                        </SubscribeBtn>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
