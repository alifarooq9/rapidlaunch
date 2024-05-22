import { Icons } from "@/components/icons";
import { MarketingMainNav } from "@/components/layout/marketing-nav";
import { buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import { getGithubRepoStars } from "@/server/actions/github";
import Link from "next/link";

export async function MarketingHeader() {
    const stars = await getGithubRepoStars();

    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-b border-border bg-background">
            <div className="container flex items-center justify-between gap-6">
                <div className="flex items-center gap-10">
                    <Link href={siteUrls.marketing.base}>
                        <Icons.logo />
                    </Link>

                    <MarketingMainNav />
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        className={buttonVariants({
                            size: "sm",
                            variant: "outline",
                            className: "items-center gap-1.5",
                        })}
                        href={siteUrls.socials.github}
                    >
                        <Icons.gitHub className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                            {stars}
                        </span>
                    </Link>
                    <Link
                        className={buttonVariants({ size: "sm" })}
                        href={siteUrls.docs.base}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
