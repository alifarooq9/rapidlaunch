import { AppHeader } from "@/app/(app)/_components/app-header";
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
    showOrgSwitcher,
}: AppLayoutProps) {
    return (
        <div className="container flex items-start gap-8">
            <div className="sticky left-0 top-0 hidden h-screen w-52 flex-shrink-0 lg:block xl:w-60 ">
                <Suspense fallback={<SidebarLoading />}>
                    <Sidebar
                        sidebarNavIncludeIds={sideNavIncludedIds}
                        sidebarNavRemoveIds={sideNavRemoveIds}
                        showOrgSwitcher={showOrgSwitcher}
                    />
                </Suspense>
            </div>
            <section className="min-h-screen w-full flex-grow">
                <div className="sticky left-0 right-0 top-0 z-50 block border-b border-border bg-background lg:hidden">
                    <AppHeader
                        showOrgSwitcher={showOrgSwitcher}
                        sidebarNavIncludeIds={sideNavIncludedIds}
                        sidebarNavRemoveIds={sideNavRemoveIds}
                    />
                </div>
                {children}
            </section>
        </div>
    );
}
