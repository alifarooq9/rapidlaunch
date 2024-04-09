import { MainNav } from "@/app/(app)/_components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteUrls } from "@/config/urls";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/app/(app)/_components/mobile-nav";

export function SiteHeader() {
    return (
        <header className="sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <div className="flex items-center gap-5">
                    <MobileNav />

                    <Link href={siteUrls.home} className="left-4 z-10">
                        <Icons.logo
                            classNameText="hidden sm:block"
                            iconProps={{
                                className:
                                    "w-6 h-6 sm:w-5 sm:h-5 fill-foreground",
                            }}
                        />
                    </Link>

                    <MainNav />
                </div>

                <nav className="flex items-center gap-2">
                    <Link
                        href={siteUrls.twitter}
                        target="_blank"
                        className={buttonVariants({
                            variant: "outline",
                            size: "iconSm",
                        })}
                    >
                        <Icons.twitter className="h-4 w-4 fill-foreground" />
                    </Link>
                    <Link
                        href={siteUrls.github}
                        target="_blank"
                        className={buttonVariants({
                            variant: "outline",
                            size: "iconSm",
                        })}
                    >
                        <Icons.gitHub className="h-4 w-4 fill-foreground" />
                    </Link>
                    <ThemeToggle
                        button={
                            <Button variant="outline" size="iconSm">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        }
                    />
                </nav>
            </div>
        </header>
    );
}
