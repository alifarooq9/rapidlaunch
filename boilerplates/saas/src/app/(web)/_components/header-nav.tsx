"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { webConfig } from "@/config/nav";
import { buttonVariants } from "@/components/ui/button";

export function WebHeaderNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-center">
            <ul className="flex items-center">
                {webConfig.headerNav.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={item.href}
                            className={cn(
                                buttonVariants({
                                    variant: isActive(item.href, pathname)
                                        ? "secondary"
                                        : "ghost",
                                }),
                            )}
                        >
                            <span>{item.label}</span>
                            {item.badge && (
                                <Badge
                                    variant={
                                        isActive(item.href, pathname)
                                            ? "background"
                                            : "secondary"
                                    }
                                    size="sm"
                                    className="ml-2"
                                >
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// it tells you if the current link is active or not based on the pathname
function isActive(href: string, pathname: string) {
    return pathname === href;
}
