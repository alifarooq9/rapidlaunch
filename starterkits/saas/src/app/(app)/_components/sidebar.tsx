import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserDropdown } from "@/app/(app)/_components/user-dropdown";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/(app)/_components/sidebar-nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type SidebarNavItems } from "@/config/sidebar";

type SideNavProps = {
    isCollapsed?: boolean;
    navItems: SidebarNavItems[];
};

/**
 * @purpose The sidebar component contains the sidebar navigation and the user dropdown.
 * to add a new navigation item, you can add a new object to the navigation array in the @see /src/config/dashboard.ts file
 * to customize the user dropdown, you can add a new object to the navigation array in the @see /src/config/user-dropdown.ts file
 *
 * fell free to customize the sidebar component as you like
 */

export function Sidebar({ isCollapsed, navItems }: SideNavProps) {
    return (
        <aside className={cn("h-full w-full border-r border-border")}>
            <div className={cn("p-4")}>
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
            </div>
            <Separator />

            <ScrollArea style={{ height: "calc(100vh - 8rem)" }}>
                <div className="h-full w-full px-4 py-2">
                    <SidebarNav isCollapsed={isCollapsed} navItems={navItems} />
                    <ScrollBar orientation="vertical" />
                </div>
            </ScrollArea>

            <Separator />

            <div className="px-4 py-2">
                <UserDropdown isCollapsed={isCollapsed} />
            </div>
        </aside>
    );
}
