import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function HomePage() {
    return (
        <MarketingLayout>
            <h1>Marketing Page</h1>
        </MarketingLayout>
    );
}

export const dynamic = "force-static";
export const revalidate = 60 * 60;
