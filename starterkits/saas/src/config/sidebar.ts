import {
    ActivitySquareIcon,
    BellIcon,
    BookTextIcon,
    CheckSquare2Icon,
    CreditCardIcon,
    DatabaseIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    ListChecksIcon,
    PenLineIcon,
    PlusCircleIcon,
    Rows3Icon,
    UsersRoundIcon,
} from "lucide-react";
import { siteUrls } from "@/config/urls";

/**
 * This file contains the configuration for the @dashboard and @admin navigation
 * to add a new navigation item, you can add a new object to the navigation array
 * 1 id: a unique id for the navigation, add it to the navIds object
 * 2 label: the label for the navigation (it's a category label)
 * 3 showLabel: if true, the label will be shown in the sidebar (it's a category label)
 * 4 items: an array of navigation items
 *   - label: the label for the navigation item
 *   - icon: the icon for the navigation item
 *   - href: the href for the navigation item
 *   - subMenu: an array of subMenu items
 *     > label: the label for the subMenu item
 *     > href: the href for the subMenu item
 *     > icon: the icon for the subMenu item
 */

type IconProps = React.HTMLAttributes<SVGElement>;

type NavItemBase = {
    label: string;
    icon: React.ComponentType<IconProps>;
    disabled?: boolean;
};

type NavItemWithHref = NavItemBase & {
    href: string;
    subMenu?: never;
};

type NavItemWithSubMenu = NavItemBase & {
    href?: never;
    subMenu: {
        label: string;
        href: string;
        icon: React.ComponentType<IconProps>;
        disabled?: boolean;
    }[];
};

type NavItem = NavItemWithHref | NavItemWithSubMenu;

export type SidebarNavItems = {
    id: string;
    label: string;
    showLabel?: boolean;
    items: NavItem[];
};

/** @Dashboard Nav Config */

const dashNavIds = {
    general: "general",
    resources: "resources",
} as const;

const dashNav: SidebarNavItems[] = [
    {
        id: dashNavIds.general,
        label: "General",
        showLabel: true,
        items: [
            {
                label: "Dashboard",
                icon: LayoutDashboardIcon,
                href: siteUrls.dashboard.home,
            },
            {
                label: "Projects",
                icon: ActivitySquareIcon,
                subMenu: [
                    {
                        label: "See Projects",
                        href: siteUrls.dashboard.projects.home,
                        icon: ListChecksIcon,
                    },
                    {
                        label: "Create Project",
                        href: siteUrls.dashboard.projects.new,
                        icon: PlusCircleIcon,
                    },
                ],
            },
            {
                label: "Tasks",
                icon: CheckSquare2Icon,
                subMenu: [
                    {
                        label: "See Tasks",
                        href: siteUrls.dashboard.tasks.home,
                        icon: ListChecksIcon,
                    },
                    {
                        label: "Create Task",
                        href: siteUrls.dashboard.tasks.new,
                        icon: PlusCircleIcon,
                    },
                ],
            },
            {
                label: "Database",
                icon: DatabaseIcon,
                href: siteUrls.dashboard.database,
            },
            {
                label: "Team",
                icon: UsersRoundIcon,
                href: siteUrls.dashboard.team,
            },
            {
                label: "Notifications",
                icon: BellIcon,
                href: siteUrls.dashboard.notifications,
            },
        ],
    },
    {
        id: dashNavIds.resources,
        label: "Resources",
        showLabel: true,
        items: [
            {
                label: "Docs",
                icon: BookTextIcon,
                href: siteUrls.docs.home,
            },
            {
                label: "Blog",
                icon: PenLineIcon,
                href: siteUrls.blog,
            },
            {
                label: "Support",
                icon: HelpCircleIcon,
                href: siteUrls.support,
            },
        ],
    },
];

/** @Admin Nav Config */
const adminNavIds = {
    admin: "admin",
} as const;

const adminNav: SidebarNavItems[] = [
    {
        id: adminNavIds.admin,
        label: "Admin",
        showLabel: true,
        items: [
            {
                label: "Dashboard",
                icon: LayoutDashboardIcon,
                href: siteUrls.admin.dashboard,
            },
            {
                label: "Users",
                icon: UsersRoundIcon,
                href: siteUrls.admin.users,
            },
            {
                label: "Pricing Plans",
                icon: CreditCardIcon,
                subMenu: [
                    {
                        label: "See Plans",
                        href: siteUrls.admin.pricingPlans.home,
                        icon: Rows3Icon,
                    },
                    {
                        label: "Create Plan",
                        href: siteUrls.admin.pricingPlans.new,
                        icon: PlusCircleIcon,
                    },
                ],
            },
            {
                label: "Blog",
                icon: PenLineIcon,
                href: siteUrls.admin.blog,
            },
            {
                label: "Settings",
                icon: DatabaseIcon,
                href: siteUrls.admin.settings,
            },
        ],
    },
];

/**
 * The dashboardConfig is an object that contains the configuration for the dashboard
 * @export all the configuration for the dashboard in dashboardConfig
 */

export const sidebarConfig = {
    dashNav,
    dashNavIds,
    adminNav,
    adminNavIds,
} as const;
