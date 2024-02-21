"use client";

import React from "react";
import { Sidebar } from "@/app/(app)/_components/sidebar";
import { sidebarConfig } from "@/config/sidebar";

/**
 * @purpose The dashboard layout component contain sidebar nav info and the main content of the dashboard
 * to add a new component in dashboard layout and use it in the `DashboardLayout` component
 */

type DashShellProps = {
    children: React.ReactNode;
    defaultCollapsed?: boolean;
};

export function DashShell({ children }: DashShellProps) {
    return (
        <div className="flex items-start">
            <div className="w-80">
                <Sidebar navItems={sidebarConfig.dashNav} />
            </div>
            <div>{children}</div>
        </div>
    );
}

/**
 * @purpose The admin layout component contain sidebar nav info and the main content of the admin
 * to add a new component in admin layout and use it in the `AdminLayout` component
 */

type AdminShellProps = {
    children: React.ReactNode;
    defaultCollapsed?: boolean;
};

export function AdminShell({ children }: AdminShellProps) {
    return (
        <div className="flex items-start">
            <div className="w-80">
                <Sidebar navItems={sidebarConfig.adminNav} />
            </div>
            <div>{children}</div>
        </div>
    );
}
