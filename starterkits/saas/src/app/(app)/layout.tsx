import { SwtichOrgLoading } from "@/app/(app)/_components/org-switch-loading";
import { NewUserSetup } from "@/app/(app)/_components/new-user-setup";
import React, { Fragment, Suspense } from "react";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <Fragment>
            <SwtichOrgLoading />
            {children}

            <Suspense fallback={null}>
                <NewUserSetup />
            </Suspense>
        </Fragment>
    );
}
