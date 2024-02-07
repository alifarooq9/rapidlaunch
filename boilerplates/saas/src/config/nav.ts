// Purpose: Contains the navigation items for the header.
// The headerNav array contains the navigation items for the header.

import { siteUrls } from "@/config/urls";

interface HeaderNavItem {
    id: string;
    href: string;
    label: string;
    badge?: string;
}

export const headerNav: HeaderNavItem[] = [
    {
        id: "pricing",
        href: siteUrls.pricing,
        label: "Pricing",
        badge: "Beta",
    },
    {
        id: "features",
        href: siteUrls.features,
        label: "Features",
        badge: "New",
    },
    {
        id: "contact",
        href: siteUrls.contact,
        label: "Contact",
    },
    {
        id: "blog",
        href: siteUrls.blog,
        label: "Blog",
    },
];

export const webConfig = {
    headerNav,
} as const;
