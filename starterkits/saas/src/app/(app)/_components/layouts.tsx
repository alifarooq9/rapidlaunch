"use client";

import React from "react";
import { Sidebar } from "@/app/(app)/_components/sidebar";
import { type SidebarNavItems, sidebarConfig } from "@/config/sidebar";

/**
 * @purpose The app shell component contain sidebar nav info and the main content of the app
 * to add a new component in app shell and use it in the `AppShell` component it will apply to all the app pages
 */

type AppShellProps = {
    children: React.ReactNode;
    sidebarNavItems: SidebarNavItems[];
};

export function AppShell({ children, sidebarNavItems }: AppShellProps) {
    return (
        <div className="relative flex items-start">
            <div className="sticky left-0 top-0 h-screen w-80 flex-shrink-0">
                <Sidebar navItems={sidebarNavItems} />
            </div>
            {children}
        </div>
    );
}

/**
 * @purpose The dashboard layout component contain sidebar nav info and the main content of the dashboard
 * to add a new component in dashboard layout and use it in the `DashboardLayout` component
 */

type DashShellProps = {
    children: React.ReactNode;
};

export function DashShell({ children }: DashShellProps) {
    return (
        <AppShell sidebarNavItems={sidebarConfig.dashNav}>{children}</AppShell>
    );
}

/**
 * @purpose The admin layout component contain sidebar nav info and the main content of the admin
 * to add a new component in admin layout and use it in the `AdminLayout` component
 */

type AdminShellProps = {
    children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
    return (
        <AppShell sidebarNavItems={sidebarConfig.adminNav}>{children}</AppShell>
    );
}
