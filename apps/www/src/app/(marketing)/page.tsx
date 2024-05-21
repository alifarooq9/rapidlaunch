import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Hero } from "@/components/marketing/hero";

export default function HomePage() {
    return (
        <MarketingLayout>
            <Hero />
        </MarketingLayout>
    );
}

export const dynamic = "force-static";
export const revalidate = 60 * 60;
