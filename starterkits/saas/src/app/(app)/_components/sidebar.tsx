import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserDropdown } from "@/app/(app)/_components/user-dropdown";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/(app)/_components/sidebar-nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PanelRightOpenIcon } from "lucide-react";

type SideNavProps = {
    isCollapsed?: boolean;
    sidebarNavIncludeIds?: string[];
    sidebarNavRemoveIds?: string[];
};

/**
 * @purpose The sidebar component contains the sidebar navigation and the user dropdown.
 * to add a new navigation item, you can add a new object to the navigation array in the @see /src/config/dashboard.ts file
 * to customize the user dropdown, you can add a new object to the navigation array in the @see /src/config/user-dropdown.ts file
 *
 * fell free to customize the sidebar component as you like
 */

export function Sidebar({
    isCollapsed,
    sidebarNavIncludeIds,
    sidebarNavRemoveIds,
}: SideNavProps) {
    return (
        <aside className={cn("h-full w-full border-r border-border")}>
            <div
                className={cn(
                    "relative flex h-14 items-center justify-between px-4",
                )}
            >
                <Link
                    href={siteUrls.home}
                    className={cn(
                        "z-10 transition-transform hover:scale-90",
                        isCollapsed &&
                            "flex w-full items-center justify-center",
                    )}
                >
                    {isCollapsed ? (
                        <Icons.logoIcon className="h-6 w-6 fill-primary" />
                    ) : (
                        <Icons.logo />
                    )}
                </Link>

                <Button
                    variant="outline"
                    size="iconSm"
                    className="absolute -right-4"
                >
                    <PanelRightOpenIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
            </div>

            <Separator />

            <div className="px-4 py-2">
                <Suspense
                    fallback={
                        <button
                            aria-disabled
                            disabled
                            className={buttonVariants({
                                variant: "outline",
                                className: "w-full",
                            })}
                        >
                            <Icons.loader />
                        </button>
                    }
                >
                    <UserDropdown isCollapsed={isCollapsed} />
                </Suspense>
            </div>

            <Separator />

            <ScrollArea style={{ height: "calc(100vh - 7.5rem)" }}>
                <div className="h-full w-full px-4 py-2">
                    <SidebarNav
                        isCollapsed={isCollapsed}
                        sidebarNavIncludeIds={sidebarNavIncludeIds}
                        sidebarNavRemoveIds={sidebarNavRemoveIds}
                    />
                    <ScrollBar orientation="vertical" />
                </div>
            </ScrollArea>
        </aside>
    );
}
