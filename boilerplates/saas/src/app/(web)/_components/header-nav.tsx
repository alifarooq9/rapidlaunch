"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { webConfig } from "@/config/nav";

export function WebHeaderNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-center">
            <ul className="flex items-center space-x-3">
                {webConfig.headerNav.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={item.href}
                            className={cn(
                                "px-2 text-sm font-medium hover:underline hover:underline-offset-4",
                                isActive(item.href, pathname)
                                    ? "underline underline-offset-4"
                                    : "",
                            )}
                        >
                            <span>{item.label}</span>
                            {item.badge && (
                                <Badge
                                    variant="secondary"
                                    size="sm"
                                    className="ml-2"
                                >
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    </li>
                ))}

                <ThemeToggle />
            </ul>
        </nav>
    );
}

// it tells you if the current link is active or not based on the pathname
function isActive(href: string, pathname: string) {
    return pathname === href;
}
