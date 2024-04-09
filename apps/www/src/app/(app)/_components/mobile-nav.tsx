"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navConfig } from "@/config/nav";
import { siteUrls } from "@/config/urls";
import { cn } from "@/lib/utils";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export function MobileNav() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <Sheet open={isOpen} onOpenChange={(o: boolean) => setIsOpen(o)}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="iconSm"
                    className="flex sm:hidden"
                >
                    <Icons.hamburger className="h-4 w-4" />
                    <span className="sr-only">menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <div className="mb-8">
                    <Link href={siteUrls.home} className="left-4 z-10">
                        <Icons.logo
                            iconProps={{
                                className:
                                    "w-6 h-6 sm:w-5 sm:h-5 fill-foreground",
                            }}
                        />
                    </Link>
                </div>

                <div className="flex flex-col space-y-2">
                    {navConfig.items.map((item) => (
                        <MobileLink
                            key={item.label}
                            href={item.href}
                            onOpenChange={setIsOpen}
                            disabled={item.disabled}
                            className={cn(
                                "text-base text-muted-foreground hover:text-foreground/80",
                                {
                                    "text-foreground": false,
                                },
                            )}
                        >
                            {item.label}
                        </MobileLink>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    disabled,
    ...props
}: MobileLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                void router.push(String(href));
                onOpenChange?.(false);
            }}
            className={cn(
                disabled && "pointer-events-none opacity-60",
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
