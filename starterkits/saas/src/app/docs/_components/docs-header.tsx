import { CommandMenu } from "@/app/docs/_components/command-menu";
import { DocsMobileSidenav } from "@/app/docs/_components/mobile-sidenav";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import Link from "next/link";

export function DocsHeader() {
    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 bg-background/70 backdrop-blur">
            <div className="flex items-center gap-4">
                <div className="block md:hidden">
                    <DocsMobileSidenav />
                </div>

                <Link
                    href={siteUrls.home}
                    className="z-10 transition-transform  hover:scale-90"
                >
                    <Icons.logo />
                </Link>
            </div>

            <section className="flex flex-grow items-center justify-end gap-2">
                <CommandMenu />

                <ThemeToggle />

                <Link
                    href={siteUrls.github}
                    className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                        className: "flex-shrink-0",
                    })}
                    target="_blank"
                >
                    <Icons.gitHub className="h-4 w-4" />
                </Link>
            </section>
        </header>
    );
}
