import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { DataTable } from "@/app/(app)/admin/users/_components/data-table";
import {
    type UsersData,
    columns,
} from "@/app/(app)/admin/users/_components/columns";
import { usersPageConfig } from "@/app/(app)/admin/users/_constants/page-config";
import { getAllUsersQuery } from "@/server/actions/user/queries";

export default async function UsersPage() {
    const fetchedUsers = await getAllUsersQuery();

    const usersData: UsersData[] = fetchedUsers.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.emailVerified ? "verified" : "unverified",
            createdAt: user.createdAt,
        };
    });

    return (
        <AppPageShell
            title={usersPageConfig.title}
            description={usersPageConfig.description}
        >
            <div className="w-full">
                {/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */}

                <DataTable columns={columns} data={usersData} />
            </div>
        </AppPageShell>
    );
}
