import { PricingPlans } from "@/components/pricing-plans";
import { Badge } from "@/components/ui/badge";
import { WebPageHeading } from "@/app/(web)/_components/header";

/**
 * Customize the pricing page to your needs. You can use the `PricingPlans` component to display the pricing plans.
 * You can also use the `Badge` and `WebPageHeading` components to display the page title and any additional information.
 *
 * To customize the pricing plans, you can modify the `PricingPlans` component. @see /components/pricing-plans.tsx
 */

export default function PricingPage() {
    return (
        <main className="container flex flex-col items-center justify-center gap-24 py-10">
            <div className="flex flex-col items-center justify-center gap-5">
                <Badge>
                    <p className="text-center text-base">Beta Pricing</p>
                </Badge>
                <WebPageHeading>Flexible Pricing Plans for You</WebPageHeading>

                <p className="text-center text-base">
                    <span>No hidden Fees </span>
                    <span className="font-light italic text-muted-foreground">
                        - Cancel at any time
                    </span>
                </p>
            </div>

            <PricingPlans />
        </main>
    );
}
