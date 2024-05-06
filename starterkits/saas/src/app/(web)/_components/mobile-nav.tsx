"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/config/header";
import { siteUrls } from "@/config/urls";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export function MobileNav() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="iconSmall">
                    <MenuIcon className="h-4 w-4" />
                    <p className="sr-only">Open menu</p>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <Icons.logo hideTextOnMobile={false} />
                </SheetHeader>
                <ul className="space-y-3 py-8">
                    <li onClick={() => setIsOpen(false)}>
                        <Link
                            href={siteUrls.home}
                            className={buttonVariants({
                                variant: "link",
                            })}
                        >
                            <span className="text-lg">Home</span>
                        </Link>
                    </li>
                    {navigation.map((item) => (
                        <li key={item.href} onClick={() => setIsOpen(false)}>
                            <Link
                                href={item.href}
                                className={cn(
                                    buttonVariants({
                                        variant: "link",
                                    }),
                                )}
                            >
                                <span className="text-lg">{item.label}</span>
                                {item.badge ? (
                                    <Badge variant="secondary" className="ml-2">
                                        {item.badge}
                                    </Badge>
                                ) : null}
                            </Link>
                        </li>
                    ))}
                </ul>
            </SheetContent>
        </Sheet>
    );
}
