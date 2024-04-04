import { CommandMenu } from "@/app/docs/_components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import Link from "next/link";

export function DocsHeader() {
    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-background/70 backdrop-blur">
            <Link
                href={siteUrls.home}
                className="z-10 transition-transform  hover:scale-90"
            >
                <Icons.logo />
            </Link>

            <section className="flex items-center gap-2">
                <CommandMenu />

                <ThemeToggle />

                <Link
                    href={siteUrls.github}
                    className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                    })}
                    target="_blank"
                >
                    <Icons.gitHub className="h-4 w-4" />
                </Link>
            </section>
        </header>
    );
}
