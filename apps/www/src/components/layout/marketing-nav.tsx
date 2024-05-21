"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { marketingPageConfig } from "@/config/pages";
import { Icons } from "@/components/icons";
import React from "react";

export function MarketingMainNav() {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [currentHovered, setCurrentHovered] = React.useState<string>("");

    return (
        <section className="hidden gap-6 sm:flex sm:items-center">
            <nav className="flex items-center gap-4">
                <ul
                    className="flex items-center gap-6"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {marketingPageConfig.nav.map((item) => (
                        <li
                            key={item.label}
                            onMouseEnter={() => {
                                if (currentHovered === "") {
                                    setCurrentHovered(item.href);
                                }
                            }}
                            onMouseLeave={() => {
                                if (currentHovered !== "") {
                                    setCurrentHovered("");
                                }
                            }}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium",
                                )}
                            >
                                <span
                                    className={cn(
                                        "transition-colors",
                                        isHovered &&
                                            currentHovered !== item.href
                                            ? "text-muted-foreground/80"
                                            : "",
                                    )}
                                >
                                    {item.label}
                                </span>

                                <span
                                    className={cn(
                                        "flex h-5 w-5 items-center justify-center rounded-sm border border-border",
                                        pathname === item.href
                                            ? "bg-secondary"
                                            : "",
                                    )}
                                >
                                    <Icons.circle
                                        className={cn(
                                            "h-2 w-2",
                                            pathname === item.href
                                                ? "block"
                                                : "hidden",
                                        )}
                                    />
                                    <Icons.chevronRight
                                        className={cn(
                                            "h-2.5 w-2.5",
                                            pathname === item.href
                                                ? "hidden"
                                                : "block",
                                        )}
                                    />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
}
