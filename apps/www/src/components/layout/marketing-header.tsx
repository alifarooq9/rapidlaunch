import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import Link from "next/link";

export function MarketingHeader() {
    return (
        <header className="sticky top-0 flex h-16 w-full items-center justify-center border-b border-border bg-background">
            <div className="container flex items-center justify-between gap-6">
                <Link href={siteUrls.marketing.base}>
                    <Icons.logo />
                </Link>

                <div className="flex items-center gap-2">
                    <Link
                        className={buttonVariants({ size: "sm" })}
                        href={siteUrls.docs.base}
                    >
                        Get Started
                    </Link>

                    <Link
                        className={buttonVariants({
                            size: "sm",
                            variant: "outline",
                        })}
                        href={siteUrls.marketing.pricing}
                    >
                        Pricing
                    </Link>
                </div>
            </div>
        </header>
    );
}
