import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { orgMembersPageConfig } from "@/app/(app)/(user)/org/members/_constants/page-config";

export default function OrgMembersPage() {
    return (
        <AppPageShell
            title={orgMembersPageConfig.title}
            description={orgMembersPageConfig.description}
        >
            <div className="w-full space-y-5"></div>
        </AppPageShell>
    );
}
