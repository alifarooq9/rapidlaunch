import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { orgMembersPageConfig } from "@/app/(app)/(user)/org/members/_constants/page-config";
import { getPaginatedOrgMembersQuery } from "@/server/actions/organization/queries";
import type { SearchParams } from "@/types/data-table";
import { z } from "zod";
import { MembersTable } from "./_components/members-table";

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

export default async function OrgMembersPage({ searchParams }: UsersPageProps) {
    const search = searchParamsSchema.parse(searchParams);

    const membersPromise = getPaginatedOrgMembersQuery(search);

    return (
        <AppPageShell
            title={orgMembersPageConfig.title}
            description={orgMembersPageConfig.description}
        >
            <div className="w-full space-y-5">
                <MembersTable membersPromise={membersPromise} />
            </div>
        </AppPageShell>
    );
}
