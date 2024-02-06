"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center">
      <ul className="flex items-center space-x-1">
        {siteConfig.headerNav.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={buttonVariants({
                variant: isActive(item.href, pathname) ? "secondary" : "ghost",
              })}
            >
              <span>{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" size="sm" className="ml-2">
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
