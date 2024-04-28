"use client";

import { type ButtonProps, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, isLinkActive } from "@/lib/utils";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { type IconProps } from "@/components/ui/icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ExternalLinkIcon } from "lucide-react";
import { sidebarConfig } from "@/config/sidebar";
import { type VariantProps } from "class-variance-authority";

/**
 * SidebarNav is a component that renders the sidebar navigation for the dashboard
 * it uses the dashboardConfig.navigation to render the navigation items
 * to add a new navigation item, you can add a new object to the dashboardConfig.navigation array @see /src/config/dashboard.ts
 *
 * @customize button ui update link style to match the design system
 */

//TODO: Make it more easy to customize the sidebar

type LinkStyleProps = {
    active?: boolean;
    disabled?: boolean;
    className?: string;
} & VariantProps<typeof buttonVariants>;

function linkStyle({ active, disabled, className, ...props }: LinkStyleProps) {
    return cn(
        buttonVariants({
            variant: active ? "secondary" : "ghost",
            size: props.size,
            ...props,
        }),
        "flex h-8 w-full items-center justify-start gap-3 px-3",
        disabled && "pointer-events-none opacity-50",
        className,
    );
}

type SidebarNavProps = {
    sidebarNavIncludeIds?: string[];
    sidebarNavRemoveIds?: string[];
};

export function SidebarNav({
    sidebarNavIncludeIds,
    sidebarNavRemoveIds,
}: SidebarNavProps) {
    const isCollapsed = false;

    const pathname = usePathname();

    const sidebarNavitems = sidebarConfig.filteredNavItems({
        removeIds: sidebarNavRemoveIds,
        includedIds: sidebarNavIncludeIds,
    });

    return (
        <TooltipProvider disableHoverableContent delayDuration={0}>
            <nav>
                {sidebarNavitems.map((nav, index) => (
                    <div key={nav.id}>
                        {nav.showLabel && (
                            <h3 className="mb-2 px-2 pt-3 text-xs font-semibold uppercase text-muted-foreground">
                                {nav.label}
                            </h3>
                        )}
                        <ul className="flex flex-col gap-1">
                            {nav.items.map((item) => (
                                <li key={item.label}>
                                    {/**
                                     * if the item has a subMenu, we will render an accordion component to handle the subMenu
                                     * otherwise, we will render a simple link
                                     */}
                                    {item.subMenu ? (
                                        <Accordion
                                            type="single"
                                            collapsible
                                            defaultValue={
                                                item.subMenu.find(
                                                    (subItem: {
                                                        label: string;
                                                        href: string;
                                                        icon: React.ComponentType<IconProps>;
                                                    }) =>
                                                        isLinkActive(
                                                            pathname,
                                                            subItem.href,
                                                        ),
                                                )
                                                    ? item.label
                                                    : undefined
                                            }
                                        >
                                            <AccordionItem value={item.label}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <AccordionTrigger
                                                            className={linkStyle(
                                                                {
                                                                    className:
                                                                        "justify-between",
                                                                },
                                                            )}
                                                        >
                                                            <div className="flex items-center justify-start gap-3 ">
                                                                <item.icon
                                                                    className={cn(
                                                                        "flex-shrink-0",
                                                                        isCollapsed
                                                                            ? "h-5 w-5"
                                                                            : "h-4 w-4 ",
                                                                    )}
                                                                />
                                                                {!isCollapsed && (
                                                                    <span className="truncate">
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </AccordionTrigger>
                                                    </TooltipTrigger>
                                                    {isCollapsed && (
                                                        <TooltipContent
                                                            side="right"
                                                            className="flex items-center gap-2 font-medium "
                                                        >
                                                            <span>
                                                                {item.label}
                                                            </span>
                                                            <ChevronDown className="h-4 w-4" />
                                                        </TooltipContent>
                                                    )}
                                                </Tooltip>
                                                <AccordionContent
                                                    className={cn(
                                                        " flex flex-col gap-1 pt-1",
                                                        isCollapsed
                                                            ? ""
                                                            : "relative pl-7 pr-0",
                                                    )}
                                                >
                                                    {item.subMenu.map(
                                                        (subItem) => (
                                                            <Tooltip
                                                                key={
                                                                    subItem.label
                                                                }
                                                            >
                                                                <TooltipTrigger className="h-full w-full">
                                                                    <NavLink
                                                                        {...subItem}
                                                                        Icon={
                                                                            subItem.icon
                                                                        }
                                                                        active={isLinkActive(
                                                                            pathname,
                                                                            subItem.href,
                                                                        )}
                                                                        isCollapsed={
                                                                            isCollapsed
                                                                        }
                                                                    />
                                                                </TooltipTrigger>
                                                                {isCollapsed && (
                                                                    <TooltipContent
                                                                        side="right"
                                                                        className="flex items-center gap-4 font-medium"
                                                                    >
                                                                        {
                                                                            subItem.label
                                                                        }
                                                                    </TooltipContent>
                                                                )}
                                                            </Tooltip>
                                                        ),
                                                    )}

                                                    {!isCollapsed && (
                                                        <Separator
                                                            orientation="vertical"
                                                            className="absolute bottom-2 left-5 right-auto"
                                                        />
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <Tooltip>
                                            <TooltipTrigger className="h-full w-full">
                                                <NavLink
                                                    {...item}
                                                    Icon={item.icon}
                                                    active={isLinkActive(
                                                        pathname,
                                                        item.href,
                                                    )}
                                                    isCollapsed={isCollapsed}
                                                />
                                            </TooltipTrigger>
                                            {isCollapsed && (
                                                <TooltipContent
                                                    side="right"
                                                    className="flex items-center gap-4 font-medium"
                                                >
                                                    {item.label}
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {index !== sidebarNavitems.length - 1 && (
                            <Separator className="my-2" />
                        )}
                    </div>
                ))}
            </nav>
        </TooltipProvider>
    );
}

// Style the NavLink component to match the design system

type NavLinkProps = {
    href: string;
    label: string;
    Icon: React.ComponentType<IconProps>;
    disabled?: boolean;
    active?: boolean;
    isCollapsed?: boolean;
    size?: ButtonProps["size"];
    external?: boolean;
};

function NavLink({
    href,
    label,
    Icon,
    disabled,
    active,
    size = "default",
    isCollapsed,
    external,
}: NavLinkProps) {
    const isExternal = href.startsWith("http") ?? external;

    const linkTarget = isExternal ? "_blank" : "_self";

    return (
        <Link
            href={href}
            className={linkStyle({ active, disabled, size })}
            target={linkTarget}
            rel="noreferrer"
        >
            <Icon
                className={cn(
                    "flex-shrink-0",
                    isCollapsed ? "h-5 w-5" : "h-4 w-4 ",
                )}
            />
            {!isCollapsed && (
                <span className="flex-grow truncate text-left">{label}</span>
            )}
            {isExternal && (
                <span className="text-muted-foreground">
                    <ExternalLinkIcon className="ml-2 h-3 w-3" />
                </span>
            )}
        </Link>
    );
}
