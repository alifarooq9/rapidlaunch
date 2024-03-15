import { SwtichOrgLoading } from "@/app/(app)/_components/org-switch-loading";
import { NewUserSetup } from "@/app/(app)/_components/new-user-setup";
import { CreateFirstOrgForm } from "@/app/(app)/_components/create-first-org-form";
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
            <Suspense fallback={null}>
                <CreateFirstOrgForm />
            </Suspense>
        </Fragment>
    );
}
