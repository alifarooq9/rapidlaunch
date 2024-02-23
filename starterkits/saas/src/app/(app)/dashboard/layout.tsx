// import { cookies } from "next/headers";
import { DashShell } from "@/app/(app)/_components/layouts";
import React from "react";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function DasboardLayout({ children }: AppLayoutProps) {
    // const collapsed = cookies().get("react-resizable-panels:collapsed");

    // let defaultCollapsed;
    // if (collapsed) {
    //     defaultCollapsed = JSON.parse(collapsed.value) as boolean;
    // }

    return <DashShell>{React.Children.toArray(children)}</DashShell>;
}
