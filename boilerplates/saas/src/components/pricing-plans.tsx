"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { type Pricing, pricings, features } from "@/config/pricing";
import { cn } from "@/lib/utils";

/**
 * This is a customizable design for pricing plans. You can customize the design to your needs.
 *
 * @introduce a new pricing plan, please refer to @see /config/pricing.ts
 */

export function PricingPlans() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pricings.map((pricing) => (
                <PricingCard key={pricing.id} pricing={pricing} />
            ))}
        </div>
    );
}

type PricingCardProps = {
    pricing: Pricing;
};

function PricingCard({ pricing }: PricingCardProps) {
    return (
        <Card className={cn("relative py-20")}>
            {pricing.badge && (
                <Badge
                    variant="outline"
                    className="absolute inset-x-10 bottom-auto top-12 w-fit"
                >
                    {pricing.badge}
                </Badge>
            )}

            <CardHeader>
                <CardTitle>{pricing.title}</CardTitle>
                <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-5">
                <p className="flex items-end gap-2">
                    <span className="text-4xl font-medium">
                        {pricing.currency.symbol}
                        {pricing.price}
                    </span>
                    <span className="font-light text-muted-foreground">
                        {pricing.currency.code} {pricing.duration}
                    </span>
                </p>
                <CardDescription className="font-light">
                    {pricing.highlight}
                </CardDescription>
                <Button
                    size="lg"
                    className="w-fit"
                    variant={pricing.buttonHighlighted ? "default" : "outline"}
                >
                    Get Started
                </Button>

                <div className="flex flex-col gap-4 pt-10">
                    <p className="text-sm font-medium">
                        What’s included in Free:
                    </p>
                    <ul className="flex flex-col gap-2">
                        {pricing.uniqueFeatures?.map((feature, index) => (
                            <li
                                key={feature + " " + index}
                                className="flex items-start gap-3"
                            >
                                <CheckIcon className="h-5 w-5 flex-shrink-0" />
                                <span className="text-sm font-light">
                                    {feature}
                                </span>
                            </li>
                        ))}

                        {features.map((feature) => (
                            <li
                                key={feature.id}
                                className="flex items-start gap-3"
                            >
                                {feature.inludedIn.includes(pricing.id) ? (
                                    <CheckIcon className="h-5 w-5 flex-shrink-0" />
                                ) : (
                                    <XIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground/60" />
                                )}
                                <span
                                    className={cn(
                                        "text-sm font-light",
                                        !feature.inludedIn.includes(pricing.id)
                                            ? "text-muted-foreground/60"
                                            : "",
                                    )}
                                >
                                    {feature.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
