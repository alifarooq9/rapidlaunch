import React from "react";
import { AppLayoutShell } from "@/app/(app)/_components/layout-shell";
import { sidebarConfig } from "@/config/sidebar";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: AppLayoutProps) {
    // these are the ids of the sidebar nav items to include in the sidebar specifically @get ids from the sidebar config
    const sideNavIncludedIds: string[] = [sidebarConfig.navIds.admin];

    return (
        <AppLayoutShell
            sideNavIncludedIds={sideNavIncludedIds}
            showOrgSwitcher={false}
        >
            {children}
        </AppLayoutShell>
    );
}
