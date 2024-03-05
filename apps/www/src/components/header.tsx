import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteUrls } from "@/config/urls";
import { buttonVariants } from "@rapidlaunch/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    return (
        <div className="container sticky top-0 z-50 max-w-[1400px] pt-5">
            <header className="container relative flex h-14 w-full items-center justify-between rounded-lg border border-border bg-background/60 px-3 backdrop-blur">
                <Link
                    href={siteUrls.home}
                    className="left-4 z-10 transition-transform  hover:scale-90"
                >
                    <Icons.logo
                        classNameText="hidden sm:block"
                        iconProps={{
                            className: "w-6 h-6 sm:w-5 sm:h-5 fill-foreground",
                        }}
                    />
                </Link>

                <div className="flex items-center space-x-2">
                    <Link
                        href="/"
                        className={buttonVariants({
                            variant: "outline",
                            size: "icon",
                        })}
                    >
                        <Icons.twitter className="h-4 w-4 fill-foreground" />
                    </Link>
                    <ThemeToggle />
                </div>
            </header>
        </div>
    );
}
