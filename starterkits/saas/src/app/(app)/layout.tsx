import { SwtichOrgLoading } from "@/app/(app)/_components/org-switch-loading";
import React, { Fragment } from "react";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <Fragment>
            <SwtichOrgLoading />
            {children}
        </Fragment>
    );
}
