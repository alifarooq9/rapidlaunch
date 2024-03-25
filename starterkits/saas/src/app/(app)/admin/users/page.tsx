import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { usersPageConfig } from "@/app/(app)/admin/users/_constants/page-config";
import { getPaginatedUsersQuery } from "@/server/actions/user/queries";
import { UsersTable } from "./_components/users-table";
import { z } from "zod";
import type { SearchParams } from "@/types/data-table";


type UsersPageProps = {
    searchParams: SearchParams;
};

const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    email: z.string().optional(),
    status: z.string().optional(),
    role: z.string().optional(),
    operator: z.string().optional(),
});

export default async function UsersPage({ searchParams }: UsersPageProps) {
    const search = searchParamsSchema.parse(searchParams);

    const usersPromise = getPaginatedUsersQuery(search);

    return (
        <AppPageShell
            title={usersPageConfig.title}
            description={usersPageConfig.description}
        >
            <div className="w-full">
                <UsersTable usersPromise={usersPromise} />
            </div>
        </AppPageShell>
    );
}
