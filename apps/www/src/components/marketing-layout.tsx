// import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";

interface MarketingLayoutProps {
    children?: React.ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <main>
            <MarketingHeader />
            <div className="container flex-1">{children}</div>
            {/* <MarketingFooter /> */}
        </main>
    );
}
