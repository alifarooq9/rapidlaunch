import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { orgMembersPageConfig } from "@/app/(app)/(user)/org/members/_constants/page-config";
import { DataTable } from "@/app/(app)/(user)/org/members/_components/data-table";
import {
    type UsersData,
    columns,
} from "@/app/(app)/(user)/org/members/_components/columns";
import { getOrgMembersQuery } from "@/server/actions/organization/queries";

export default async function OrgMembersPage() {
    const members = await getOrgMembersQuery();

    const membersData: UsersData[] = members.map((member) => ({
        id: member.memberId,
        email: member.user.email,
        name: member.user.name,
        role: member.role,
        createdAt: member.createdAt,
    }));

    return (
        <AppPageShell
            title={orgMembersPageConfig.title}
            description={orgMembersPageConfig.description}
        >
            <div className="w-full space-y-5">
                {/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */}

                <DataTable columns={columns} data={membersData} />
            </div>
        </AppPageShell>
    );
}
