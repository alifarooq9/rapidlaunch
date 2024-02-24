import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserDropdown } from "@/app/(app)/_components/user-dropdown";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { SidebarNav } from "@/app/(app)/_components/sidebar-nav";

type SideNavProps = {
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
    sidebarNavIncludeIds,
    sidebarNavRemoveIds,
}: SideNavProps) {
    return (
        <aside className={cn("h-full w-full")}>
            <div className={cn(" flex h-16 items-center justify-between px-4")}>
                <Link
                    href={siteUrls.home}
                    className={cn("z-10 transition-transform hover:scale-90")}
                >
                    <Icons.logo />
                </Link>
            </div>

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
                            <Icons.loader className="h-4 w-4" />
                        </button>
                    }
                >
                    <UserDropdown />
                </Suspense>
            </div>

            <ScrollArea style={{ height: "calc(100vh - 7.5rem)" }}>
                <div className="h-full w-full px-4 py-2">
                    <SidebarNav
                        sidebarNavIncludeIds={sidebarNavIncludeIds}
                        sidebarNavRemoveIds={sidebarNavRemoveIds}
                    />
                    <ScrollBar orientation="vertical" />
                </div>
            </ScrollArea>
        </aside>
    );
}
