import { MobileSidenav } from "@/app/(app)/_components/mobile-sidenav";
import { Icons } from "@/components/ui/icons";

type AppHeaderProps = {
    sidebarNavIncludeIds?: string[];
    sidebarNavRemoveIds?: string[];
    showOrgSwitcher?: boolean;
};

export function AppHeader({
    sidebarNavIncludeIds,
    sidebarNavRemoveIds,
    showOrgSwitcher,
}: AppHeaderProps) {
    return (
        <header className="sticky top-0 flex h-14 items-center gap-4 border-b border-border bg-background">
            <MobileSidenav
                showOrgSwitcher={showOrgSwitcher}
                sidebarNavIncludeIds={sidebarNavIncludeIds}
                sidebarNavRemoveIds={sidebarNavRemoveIds}
            />
            <Icons.logo hideTextOnMobile={false} />
        </header>
    );
}
