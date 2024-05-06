import { Sidebar } from "@/app/(app)/_components/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

type MobileSideNavProps = {
    sidebarNavIncludeIds?: string[];
    sidebarNavRemoveIds?: string[];
    showOrgSwitcher?: boolean;
};

export function MobileSidenav({
    showOrgSwitcher,
    sidebarNavIncludeIds,
    sidebarNavRemoveIds,
}: MobileSideNavProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="iconSmall">
                    <MenuIcon className="h-4 w-4" />
                    <p className="sr-only">Open menu</p>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-3 pb-20 pt-10">
                <Sidebar
                    showLogo={false}
                    showOrgSwitcher={showOrgSwitcher}
                    sidebarNavIncludeIds={sidebarNavIncludeIds}
                    sidebarNavRemoveIds={sidebarNavRemoveIds}
                />
            </SheetContent>
        </Sheet>
    );
}
