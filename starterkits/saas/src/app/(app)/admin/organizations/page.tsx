import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { z } from "zod";
import type { SearchParams } from "@/types/data-table";
import { organizationsPageConfig } from "@/app/(app)/admin/organizations/_constants/page-config";
import { getPaginatedOrgsQuery } from "@/server/actions/organization/queries";
import { OrgsTable } from "@/app/(app)/admin/organizations/_components/orgs-table";

type UsersPageProps = {
    searchParams: SearchParams;
};

const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    operator: z.string().optional(),
});

export default async function AdminOrganizationsPage({
    searchParams,
}: UsersPageProps) {
    const search = searchParamsSchema.parse(searchParams);

    const orgsPromise = getPaginatedOrgsQuery(search);

    return (
        <AppPageShell
            title={organizationsPageConfig.title}
            description={organizationsPageConfig.description}
        >
            <div className="w-full">
                <OrgsTable orgsPromise={orgsPromise} />
            </div>
        </AppPageShell>
    );
}
