import { SwitchPlanModal } from "@/app/(app)/(user)/org/billing/_components/switch-plan-modal";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { features, pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";
import type { OrgSubscription } from "@/types/org-subscription";
import { CheckIcon, XIcon } from "lucide-react";

type AvailablePlansProps = {
    subscription: OrgSubscription;
};

export function AvailablePlans({ subscription }: AvailablePlansProps) {
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
                                <div
                                    className={buttonVariants({
                                        className: "w-full ",
                                        variant: "outline",
                                    })}
                                >
                                    Current Plan
                                </div>
                            ) : (
                                plan.variantId && (
                                    <div className="flex w-full flex-col gap-2">
                                        <SwitchPlanModal
                                            cardBrand={
                                                subscription?.card_brand ?? ""
                                            }
                                            lastCardDigits={
                                                subscription?.card_last_four ??
                                                ""
                                            }
                                            currencyCode={plan.currency.code}
                                            currencySymbol={
                                                plan.currency.symbol
                                            }
                                            planName={plan.title}
                                            price={plan.price.monthly}
                                            variantId={plan.variantId?.monthly}
                                        />

                                        <SwitchPlanModal
                                            cardBrand={
                                                subscription?.card_brand ?? ""
                                            }
                                            lastCardDigits={
                                                subscription?.card_last_four ??
                                                ""
                                            }
                                            currencyCode={plan.currency.code}
                                            currencySymbol={
                                                plan.currency.symbol
                                            }
                                            planName={plan.title}
                                            price={plan.price.yearly}
                                            variantId={plan.variantId?.yearly}
                                        />
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
