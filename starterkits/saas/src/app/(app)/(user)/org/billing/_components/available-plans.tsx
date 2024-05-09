"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { pricingFeatures, pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";
import type { OrgSubscription } from "@/types/org-subscription";
import { CheckIcon, XIcon } from "lucide-react";
import { SwitchPlanModal } from "@/app/(app)/(user)/org/billing/_components/switch-plan-modal";

type AvailablePlansProps = {
    subscription: OrgSubscription;
};


const FormSchema = z.object({
    plan: pricingPlans.length > 0
        ? z.enum(pricingPlans.map((plan) => plan.id) as [string, ...string[]])
        : z.enum(['default']),
    billing: z.enum(["monthly", "yearly"]),
});
export function AvailablePlans({ subscription }: AvailablePlansProps) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            plan: pricingPlans.find((plan) => plan.variantId?.monthly === subscription?.variant_id || plan.variantId?.yearly === subscription?.variant_id)?.id ?? pricingPlans[0]?.id,
            billing: pricingPlans.find((plan) => plan.variantId?.monthly === subscription?.variant_id || plan.variantId?.yearly === subscription?.variant_id) ? 'monthly' : 'yearly',
        },
    });

  const selectedPlanId = form.watch('plan')!;
    const selectedBilling = form.watch('billing');

    const selectedPlan = pricingPlans.find((plan) => plan.id === selectedPlanId) ?? pricingPlans[0];
    const selectedVariantId = selectedBilling === 'monthly' ? selectedPlan?.variantId?.monthly : selectedPlan?.variantId?.yearly;
    
    return (
        <form>
            <Card>
                <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                    <CardDescription>
                        View available plans and change subscription
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className=" grid gap-4 lg:grid-cols-2 lg:gap-6">
                        <div className="">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Billing Cycle</CardTitle>
                                        <CardDescription>Choose your billing cycle</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup defaultValue={pricingPlans.find((plan) => plan.variantId?.monthly === subscription?.variant_id || plan.variantId?.yearly === subscription?.variant_id) ? 'monthly' : 'yearly'} {...form.register('billing')} className="grid grid-cols-2 gap-4 sm:-mt-6" onValueChange={(value) => form.setValue('billing', value)}>
                                            <div>
                                                <RadioGroupItem className="peer sr-only" id="monthly" value="monthly" />
                                                <Label
                                                    className={buttonVariants({
                                                        className: "w-full peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50",
                                                        variant: "outline",
                                                    })}
                                                    htmlFor="monthly"
                                                >
                                                    Monthly
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem className="peer sr-only" id="yearly" value="yearly" />
                                                <Label
                                                    className={buttonVariants({
                                                        className: "w-full peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50",
                                                        variant: "outline",
                                                    })} htmlFor="yearly"
                                                >
                                                    Yearly
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Plans</CardTitle>
                                        <CardDescription>Choose your plan</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup defaultValue={pricingPlans.find((plan) => plan.variantId?.monthly === subscription?.variant_id || plan.variantId?.yearly === subscription?.variant_id)?.id ?? pricingPlans[0]?.id} className="space-y-4 sm:-mt-6" {...form.register('plan')} onValueChange={(value) => form.setValue('plan', value)}>
                                            {pricingPlans.map((plan) => (
                                                <div key={plan.id} >
                                                    <RadioGroupItem className="peer sr-only" id={plan.title} value={plan.id} />
                                                    <Label
                                                        className="flex items-center justify-between rounded-md border border-gray-200  p-4 g-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors  hover:text-gray-900  focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800   dark:hover:text-gray-50  dark:focus:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                                                        htmlFor={plan.title}
                                                    >
                                                        <div className="space-y-1">
                                                            <div className="text-lg font-semibold">{plan.title}</div>
                                                            <p className="text-gray-500 dark:text-gray-400 text-xs font-light pr-2">
                                                                {plan.description}
                                                            </p>
                                                        </div>
                                                        <div className="text-lg font-semibold">${selectedBilling === 'monthly' ? plan.price.monthly : plan.price.yearly}</div>
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-3xl">{selectedPlan?.title} Plan</CardTitle>
                                    <CardDescription>{selectedPlan?.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {pricingFeatures.map((feature) => (
                                            <li
                                                key={feature.id}
                                                className={cn(
                                                    "flex items-center text-sm font-light",
                                                    !feature.inludedIn.includes(
                                                        selectedPlanId,
                                                    ) && "text-muted-foreground/70",
                                                )}
                                            >
                                                {feature.inludedIn.includes(selectedPlanId) ? (
                                                    <CheckIcon className="mr-1 h-4 w-4" />
                                                ) : (
                                                    <XIcon className="mr-1 h-4 w-4 text-muted-foreground/70" />
                                                )}
                                                {feature.title}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            {selectedVariantId === subscription?.variant_id ? (
                                <div
                                    className={buttonVariants({
                                        className: "w-full opacity-70  cursor-not-allowed",
                                        variant: "outline",
                                    })}
                                >
                                    Current Plan
                                </div>
                            ) : selectedPlan?.title === 'Free' ? null : (
                                <div className="flex w-full flex-col gap-2">
                                    <SwitchPlanModal
                                        cardBrand={subscription?.card_brand ?? ""}
                                        lastCardDigits={subscription?.card_last_four ?? ""}
                                        currencyCode={selectedPlan?.currency.code ?? "USD"}
                                        currencySymbol={selectedPlan?.currency.symbol ?? "$"}
                                        planName={selectedPlan?.title ?? ""}
                                        price={
                                            selectedBilling === 'monthly'
                                                ? (selectedPlan?.price.monthly ?? 0)
                                                : (selectedPlan?.price.yearly ?? 0)
                                        }
                                        variantId={selectedVariantId}
                                        status={subscription?.status ?? ""}
                                    />
                                </div>
                            )}
                        </div>

                    </div>

                </CardContent>
            </Card>
        </form>
    )
}