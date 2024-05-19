/**
 * @purpose Contains the navigation items for the header.
 * The headerNav array contains the navigation items for the header.
 *
 * To Add a new navigation item:
 * 1. Add a new object to the headerNav array with the following properties:
 *  - id: A unique string identifier for the navigation item.
 *  - href: The URL for the navigation item.
 *  - label: The label for the navigation item.
 *  - badge: (Optional) A badge to display next to the navigation item.
 * 2. Import the siteUrls object from "@/config/urls".
 * 3. Add the URL for the navigation item to the siteUrls object.
 */

import { siteUrls } from "@/config/urls";

interface NavigationItem {
    id: string;
    href: string;
    label: string;
    badge?: string;
    external?: boolean;
}

export const navigation: NavigationItem[] = [
    {
        id: "pricing",
        href: siteUrls.pricing,
        label: "Pricing",
        badge: "Beta",
    },
    {
        id: "support",
        href: siteUrls.support,
        label: "Support",
    },
    {
        id: "blogs",
        href: siteUrls.blogs,
        label: "Blogs",
    },
    {
        id: "docs",
        href: siteUrls.docs,
        label: "Docs",
    },
    {
        id: "changelogs",
        href: siteUrls.changelogs,
        label: "Changelogs",
    },
];
