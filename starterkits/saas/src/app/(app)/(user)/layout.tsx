import React from "react";
import { AppLayoutShell } from "@/app/(app)/_components/layout-shell";
import { sidebarConfig } from "@/config/sidebar";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function UserLayout({ children }: AppLayoutProps) {
    // these are the ids of the sidebar nav items to not included in the sidebar specifically @get ids from the sidebar config
    const sideNavRemoveIds: string[] = [sidebarConfig.navIds.admin];

    return (
        <AppLayoutShell sideNavRemoveIds={sideNavRemoveIds}>
            {children}
        </AppLayoutShell>
    );
}
