// Purpose: Contains the navigation items for the header.
// The headerNav array contains the navigation items for the header.

import { urls } from "@/config/urls";

interface HeaderNavItem {
  id: string;
  href: string;
  label: string;
  badge?: string;
}

export const headerNav: HeaderNavItem[] = [
  {
    id: "pricing",
    href: urls.pricing,
    label: "Pricing",
    badge: "Beta",
  },
  {
    id: "features",
    href: urls.features,
    label: "Features",
    badge: "New",
  },
  {
    id: "contact",
    href: urls.contact,
    label: "Contact",
  },
  {
    id: "blog",
    href: urls.blog,
    label: "Blog",
  },
];
