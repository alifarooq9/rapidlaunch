import { cookies } from "next/headers";
import { AdminShell } from "@/app/(app)/_components/layouts";
import React from "react";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: AppLayoutProps) {
    const collapsed = cookies().get("react-resizable-panels:collapsed");

    let defaultCollapsed;
    if (collapsed) {
        defaultCollapsed = JSON.parse(collapsed.value) as boolean;
    }

    return (
        <AdminShell defaultCollapsed={defaultCollapsed}>
            {React.Children.toArray(children)}
        </AdminShell>
    );
}
