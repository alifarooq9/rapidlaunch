import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { DataTable } from "@/app/(app)/admin/users/_components/data-table";
import {
    type UsersData,
    columns,
} from "@/app/(app)/admin/users/_components/columns";
import { db } from "@/server/db";
import { desc } from "drizzle-orm";
import { users } from "@/server/db/schema";

async function getUsers() {
    return await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
    });
}

export default async function UsersPage() {
    const fetchedUsers = await getUsers();

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
            title="Users"
            description="View all users in your app. Perform actions such as creating new users, sending users login links, debug bugs your users face by logging in as them and more!"
        >
            <div className="w-full">
                <DataTable columns={columns} data={usersData} />
            </div>
        </AppPageShell>
    );
}
