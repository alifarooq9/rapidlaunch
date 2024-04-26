"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn, isLinkActive } from "@/lib/utils";
import { navigation } from "@/config/header";
import { buttonVariants } from "@/components/ui/button";

/**
 *  For adding a new navigation item:
 *
 *  - Add a new object to the headerNav array in the webConfig object in the nav.ts file located /config/web.ts.
 */

export function WebHeaderNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-center">
            <ul className="flex items-center">
                {navigation.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: "link" }),
                                isLinkActive(item.href, pathname)
                                    ? "font-semibold"
                                    : "font-medium",
                            )}
                        >
                            <span>{item.label}</span>
                            {item.badge && (
                                <Badge
                                    variant="outline"
                                    size="sm"
                                    className="ml-1"
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
