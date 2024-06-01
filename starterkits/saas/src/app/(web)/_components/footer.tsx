import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { navigation } from "@/config/header";
import { siteConfig } from "@/config/site";
import { siteUrls } from "@/config/urls";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export function WebFooter() {
    return (
        <div className="pb-0 sm:px-4 sm:py-8">
            <footer className="container grid grid-cols-1 gap-8 border border-border bg-background p-8 sm:grid-cols-2 sm:rounded-lg">
                <div className="grid place-content-between gap-2">
                    <div className="grid gap-2">
                        <Link
                            href={siteUrls.dashboard.home}
                            className={cn("z-10")}
                        >
                            <Icons.logo
                                className="text-xl"
                                iconProps={{
                                    className: "w-6 h-6 fill-primary",
                                }}
                            />
                            <span className="sr-only">Rapidlaunch logo</span>
                        </Link>
                        <Balancer as="p" className="text-muted-foreground">
                            {siteConfig.description}
                        </Balancer>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={siteUrls.docs}
                            className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                            })}
                        >
                            <BookOpenIcon className="h-4 w-4" />
                            <span className="sr-only">Docs</span>
                        </Link>
                        <Link
                            href={siteUrls.github}
                            className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                            })}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Icons.gitHub className="h-4 w-4" />
                            <span className="sr-only">Rapidlaunch github</span>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">Resources</h3>
                        {navigation.map((item) => (
                            <FooterLink
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                external={item.external}
                            />
                        ))}
                        <FooterLink
                            href={siteUrls.github}
                            label="Github"
                            external
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">Usefull links</h3>
                        {navigation.map((item) => (
                            <FooterLink
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                external={item.external}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">More</h3>
                        {navigation.map((item) => (
                            <FooterLink
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                external={item.external}
                            />
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

interface FooterLinkProps {
    href: string;
    label: string;
    external?: boolean;
}

function FooterLink({ href, label, external = false }: FooterLinkProps) {
    const isExternal = external || href.startsWith("http");

    const externalProps = isExternal
        ? {
              target: "_blank",
              rel: "noreferrer",
          }
        : {};

    return (
        <Link
            className="inline-flex items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
            href={href}
            {...externalProps}
        >
            {label}
            {isExternal ? (
                <ArrowUpRightIcon className="ml-1 h-4 w-4 flex-shrink-0" />
            ) : null}
        </Link>
    );
}
