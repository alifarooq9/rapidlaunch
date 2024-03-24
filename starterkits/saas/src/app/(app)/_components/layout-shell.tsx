import { Sidebar, SidebarLoading } from "@/app/(app)/_components/sidebar";
import { Suspense } from "react";

type AppLayoutProps = {
    children: React.ReactNode;
    sideNavRemoveIds?: string[];
    sideNavIncludedIds?: string[];
    showOrgSwitcher?: boolean;
};

/**
 * @purpose The app shell component contain sidebar nav info and the main content of the app
 * to add a new component in app shell and use it in the `AppShell` component it will apply to all the app pages
 *
 * @param children the main content of the app
 * @param sideNavIncludedIds the ids of the sidebar nav items to include in the sidebar specifically @get ids from the sidebar config
 * @param sideNavRemoveIds the ids of the sidebar nav items to remove from the sidebar specifically @get ids from the sidebar config
 *
 */

export function AppLayoutShell({
    children,
    sideNavIncludedIds,
    sideNavRemoveIds,
    showOrgSwitcher
}: AppLayoutProps) {
    return (
        <div className="container flex items-start ">
            <div className="sticky left-0 top-0 h-screen w-60 flex-shrink-0 ">
                <Suspense fallback={<SidebarLoading />}>
                    <Sidebar
                        sidebarNavIncludeIds={sideNavIncludedIds}
                        sidebarNavRemoveIds={sideNavRemoveIds}
                        showOrgSwitcher={showOrgSwitcher}
                    />
                </Suspense>
            </div>
            <section className="min-h-screen w-full flex-grow">
                {children}
            </section>
        </div>
    );
}
