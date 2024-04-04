import Link from "next/link";
import { WebHeaderNav } from "@/app/(web)/_components/header-nav";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderAuth } from "@/app/(web)/_components/header-auth";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

export function WebHeader() {
    return (
        <div className="container sticky top-0 z-50 max-w-[1400px] pt-5">
            <header className="container relative flex h-14 w-full items-center rounded-lg border border-border bg-background/60 backdrop-blur sm:px-12">
                <Link
                    href={siteUrls.home}
                    className="absolute left-4 z-10 transition-transform  hover:scale-90"
                >
                    <Icons.logo />
                </Link>

                <div className="absolute left-0 right-0 mx-auto ">
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
