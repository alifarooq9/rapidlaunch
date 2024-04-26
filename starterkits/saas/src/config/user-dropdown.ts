import { LayoutDashboardIcon, Settings2Icon } from "lucide-react";
import { siteUrls } from "@/config/urls";

type IconProps = React.HTMLAttributes<SVGElement>;

type NavItem = {
    label: string;
    icon: React.ComponentType<IconProps>;
    href: string;
    disabled?: boolean;
};

export type UserDropdownNavItems = {
    id: string;
    label: string;
    items: NavItem[];
};

const navIds = {
    profile: "profile",
    admin: "admin",
};

/**
 * @purpose Contains the navigation items for the user dropdown.
 * The userDropdownConfig object contains the navigation items for the user dropdown.
 * The navigation array contains the navigation items for the user dropdown.
 * The navIds object contains the unique string identifiers for the navigation items.
 *
 * To Add a new navigation item:
 * 1. Add a new object to the navigation array with the following properties:
 * - id: A unique string identifier for the navigation item, use the navIds object to add the id.
 * - label: The label for the navigation item.
 * - items: An array of navigation items.
 */

const navigation: UserDropdownNavItems[] = [
    {
        id: navIds.profile,
        label: "Profile",
        items: [
            {
                label: "Dashboard",
                icon: LayoutDashboardIcon,
                href: siteUrls.dashboard.home,
            },
            {
                label: "Settings",
                icon: Settings2Icon,
                href: siteUrls.profile.settings,
            },
        ],
    },
    {
        id: navIds.admin,
        label: "Admin",
        items: [
            {
                label: "Admin Panel",
                icon: LayoutDashboardIcon,
                href: siteUrls.admin.dashboard,
            },
        ],
    },
];

type FilterNavItemsProps = {
    removeIds?: string[];
    includedIds?: string[];
};

/**
 * @purpose Filters the navigation items for the user dropdown.
 * The filterNavItems function filters the navigation items for the user dropdown.
 * @param removeIds An array of string identifiers to remove from the navigation items.
 * @param includeIds An array of string identifiers to include in the navigation items.
 *
 * @returns The filtered navigation items for the user dropdown.
 * */

export function filterNavItems({
    removeIds = [],
    includedIds = [],
}: FilterNavItemsProps = {}) {
    let includedItems = userDropdownConfig.navigation;

    if (includedIds.length) {
        includedItems = includedItems.filter((item) =>
            includedIds.includes(item.id),
        );
    }

    if (removeIds.length) {
        includedItems = includedItems.filter(
            (item) => !removeIds.includes(item.id),
        );
    }

    return includedItems;
}

export const userDropdownConfig = {
    navigation,
    navIds,
    filterNavItems,
};
