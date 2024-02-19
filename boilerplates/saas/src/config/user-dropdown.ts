import {
    CreditCardIcon,
    LayoutDashboardIcon,
    Settings2Icon,
} from "lucide-react";
import { siteUrls } from "@/config/urls";

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

type IconProps = React.HTMLAttributes<SVGElement>;

type NavItem = {
    label: string;
    icon: React.ComponentType<IconProps>;
    href: string;
    disabled?: boolean;
};

type Nav = {
    id: string;
    label: string;
    items: NavItem[];
};

const navIds = {
    profile: "profile",
    admin: "admin",
};

const navigation: Nav[] = [
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
            {
                label: "Billing",
                icon: CreditCardIcon,
                href: siteUrls.profile.billing,
            },
        ],
    },
    {
        id: navIds.admin,
        label: "Admin",
        items: [
            {
                label: "Admin Dashboard",
                icon: LayoutDashboardIcon,
                href: "/admin/dashboard",
            },
        ],
    },
];

export const userDropdownConfig = { navigation, navIds };
