"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { pricingFeatures, pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";
import type { OrgSubscription } from "@/types/org-subscription";
import { CheckIcon, XIcon } from "lucide-react";

type AvailablePlansProps = {
    subscription: OrgSubscription;
};


const FormSchema = z.object({
    plan: z.enum([pricingPlans[0].id, pricingPlans[1].id, pricingPlans[2].id]), // eslint-disable-line will always be valid
    billing: z.enum(["monthly", "yearly"]),
});
export function AvailablePlans({ subscription }: AvailablePlansProps) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            plan: pricingPlans[0].id,
            billing: 'monthly', // 'monthly', 'yearly'
        },
    });


    const selectedPlan = form.watch('plan')
    const selectedBilling = form.watch('billing')

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                        <CardTitle className="text-xl">Billing Cycle</CardTitle>
                                        <CardDescription>Choose your billing cycle</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                            <RadioGroup defaultValue="monthly" {...form.register('billing')} className="grid grid-cols-2 gap-4 sm:-mt-6" onValueChange={(value) => form.setValue('billing', value)}>
                                                <div>
                                                    <RadioGroupItem className="peer sr-only" id="monthly" value="monthly" />
                                                    <Label
                                                        className="flex p-2 w-full items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                                                        htmlFor="monthly"
                                                    >
                                                        Monthly
                                                    </Label>
                                                </div>
                                                <div>
                                                    <RadioGroupItem className="peer sr-only" id="yearly" value="yearly" />
                                                    <Label
                                                        className="flex p-2 w-full items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                                                        htmlFor="yearly"
                                                    >
                                                        Yearly
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">Plans</CardTitle>
                                        <CardDescription>Choose your plan</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    <RadioGroup defaultValue={pricingPlans[0].id} className="space-y-4 sm:-mt-6" {...form.register('plan')} onValueChange={(value) => form.setValue('plan', value)}>
                                        {pricingPlans.map((plan) => (
                                            <div key={plan.id} >
                                                <RadioGroupItem className="peer sr-only" id={plan.title} value={plan.id} />
                                                <Label
                                                    className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
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
                                    <CardTitle className="text-3xl">{pricingPlans.find(plan => plan.id === selectedPlan)?.title} Plan</CardTitle>
                                    <CardDescription>{pricingPlans.find(plan => plan.id === selectedPlan)?.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {pricingFeatures.map((feature) => (
                                            <li
                                                key={feature.id}
                                                className={cn(
                                                    "flex items-center text-sm font-light",
                                                    !feature.inludedIn.includes(
                                                        selectedPlan,
                                                    ) && "text-muted-foreground/70",
                                                )}
                                            >
                                                {feature.inludedIn.includes(selectedPlan) ? (
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
                            <Button type="submit" className="w-full">Proceed to payment</Button>
                        </div>
                        
                    </div>
                    
                </CardContent>
            </Card>
        </form>
    )
}