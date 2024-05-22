import Link from "next/link";
import { WebHeaderNav } from "@/app/(web)/_components/header-nav";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderAuth } from "@/app/(web)/_components/header-auth";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/app/(web)/_components/mobile-nav";

export function WebHeader() {
    return (
        <div className="container sticky top-0 z-50 max-w-[1400px] pt-5">
            <header className=" relative flex h-14 w-full items-center rounded-lg border border-border bg-background/60 backdrop-blur sm:px-12">
                <div className="absolute left-4 z-10 flex items-center gap-4 transition-transform">
                    <div className="z-50 block lg:hidden">
                        <MobileNav />
                    </div>

                    <Link href={siteUrls.home}>
                        <Icons.logo />
                        <span className="sr-only">Rapidlaunch logo</span>
                    </Link>
                </div>

                <div className="absolute left-0 right-0 mx-auto hidden lg:block ">
                    <WebHeaderNav />
                </div>

                <div className="absolute right-4 flex items-center space-x-2">
                    <ThemeToggle />
                    <Suspense
                        fallback={
                            <Button
                                disabled
                                aria-disabled
                                variant="secondary"
                                className="w-28"
                            >
                                <Icons.loader className="h-4 w-4" />
                            </Button>
                        }
                    >
                        <HeaderAuth />
                    </Suspense>
                </div>
            </header>
        </div>
    );
}
