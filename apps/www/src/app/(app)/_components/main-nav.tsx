"use client";

import { navConfig } from "@/config/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MainNav() {
    const pathname = usePathname();

    return (
        <section className="hidden gap-6 sm:flex sm:items-center">
            <nav className="flex items-center gap-2">
                <ul className="flex items-center gap-5">
                    {navConfig.items.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className={cn(
                                    " text-sm text-muted-foreground hover:text-foreground/80",
                                    {
                                        "text-foreground":
                                            pathname === item.href,
                                    },
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
}
