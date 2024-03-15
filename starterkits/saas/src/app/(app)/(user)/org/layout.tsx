import { siteUrls } from "@/config/urls";
import { getOrganizations } from "@/server/actions/organization/queries";
import { redirect } from "next/navigation";
import { Fragment, type ReactNode } from "react";

type OrgLayoutProps = {
    children: ReactNode;
};

export default async function OrgLayout({ children }: OrgLayoutProps) {
    const { userOrgs } = await getOrganizations();

    if (userOrgs.length === 0) {
        redirect(siteUrls.dashboard.home);
    }

    return <Fragment>{children}</Fragment>;
}
