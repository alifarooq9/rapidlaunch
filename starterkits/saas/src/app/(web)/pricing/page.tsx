import { PricingTable } from "@/app/(web)/pricing/_components/pricing-table";
import {
    WebPageHeading,
    WebPageWrapper,
} from "@/app/(web)/_components/generals-components";

/**
 * Customize the pricing page to your needs. You can use the `PricingPlans` component to display the pricing plans.
 * You can also use the `Badge` and `WebPageHeading` components to display the page title and any additional information.
 *
 * To customize the pricing plans, you can modify the `PricingPlans` component. @see /app/(web)/pricing/components/pricing-plans.tsx
 */

export default function PricingPage() {
    return (
        <WebPageWrapper>
            <WebPageHeading
                title="Flexible Pricing Plans for You"
                badge="Beta Pricing"
            >
                <p className="text-center text-base">
                    <span>No hidden Fees </span>
                    <span className="font-light italic text-muted-foreground">
                        - Cancel at any time
                    </span>
                </p>
            </WebPageHeading>

            <PricingTable />
        </WebPageWrapper>
    );
}
