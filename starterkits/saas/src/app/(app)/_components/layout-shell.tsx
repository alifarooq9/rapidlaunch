import { Sidebar } from "@/app/(app)/_components/sidebar";

type AppLayoutProps = {
    children: React.ReactNode;
    sideNavRemoveIds?: string[];
    sideNavIncludedIds?: string[];
};

/**
 * @purpose The app shell component contain sidebar nav info and the main content of the app
 * to add a new component in app shell and use it in the `AppShell` component it will apply to all the app pages
 *
 * @param children the main content of the app
 * @param sideNavIncludedIds the ids of the sidebar nav items to include in the sidebar specifically @get ids from the sidebar config
 * @param sideNavRemoveIds the ids of the sidebar nav items to remove from the sidebar specifically @get ids from the sidebar config
 */

export function AppLayoutShell({
    children,
    sideNavIncludedIds,
    sideNavRemoveIds,
}: AppLayoutProps) {
    return (
        <div className="relative flex items-start">
            <div className="sticky left-0 top-0 h-screen w-80 flex-shrink-0">
                <Sidebar
                    isCollapsed={false}
                    sidebarNavIncludeIds={sideNavIncludedIds}
                    sidebarNavRemoveIds={sideNavRemoveIds}
                />
            </div>
            {children}
        </div>
    );
}
