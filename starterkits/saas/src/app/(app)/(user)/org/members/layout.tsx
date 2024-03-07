import type { ReactNode } from "react";

type OrgMembersLayoutProps = {
    children: ReactNode;
};

export default function OrgMembersLayout({ children }: OrgMembersLayoutProps) {
    return <div>{children}</div>;
}
