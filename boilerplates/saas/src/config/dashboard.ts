import {
    ActivitySquareIcon,
    BellIcon,
    BookTextIcon,
    CheckSquare2Icon,
    DatabaseIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    ListChecksIcon,
    PenLineIcon,
    PlusCircleIcon,
    UsersRoundIcon,
} from "lucide-react";
import { siteUrls } from "@/config/urls";

/**
 * This file contains the configuration for the dashboard navigation
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
 *
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
    }[];
};

type NavItem = NavItemWithHref | NavItemWithSubMenu;

type Nav = {
    id: string;
    label: string;
    showLabel?: boolean;
    items: NavItem[];
};

const navIds = {
    general: "general",
    resources: "resources",
} as const;

const navigation: Nav[] = [
    {
        id: navIds.general,
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
        id: navIds.resources,
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

/**
 * The dashboardConfig is an object that contains the configuration for the dashboard
 * @export all the configuration for the dashboard in dashboardConfig
 */

export const dashboardConfig = {
    navigation,
    navIds,
} as const;
