import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { WaitlistTable } from "@/app/(app)/admin/waitlist/_components/waitlist-table";
import { waitlistPageConfig } from "@/app/(app)/admin/waitlist/_constants/page-config";
import {
    getAllWaitlistUsersQuery,
    getPaginatedWaitlistQuery,
} from "@/server/actions/waitlist/query";
import type { SearchParams } from "@/types/data-table";
import { z } from "zod";
import json2csv from "json2csv";
import { DownloadCsvBtn } from "@/app/(app)/admin/waitlist/_components/download-csv-btn";

type WaitlistProps = {
    searchParams: SearchParams;
};

const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    email: z.string().optional(),
    operator: z.string().optional(),
});

export default async function Waitlist({ searchParams }: WaitlistProps) {
    const search = searchParamsSchema.parse(searchParams);

    const waitlistPromise = getPaginatedWaitlistQuery(search);

    const waitlistData = await getAllWaitlistUsersQuery();

    const csvData = await json2csv.parseAsync(waitlistData);

    return (
        <AppPageShell
            title={waitlistPageConfig.title}
            description={waitlistPageConfig.description}
        >
            <div className="w-full space-y-6">
                <div className="flex items-center justify-end">
                    <DownloadCsvBtn data={csvData} />
                </div>

                <WaitlistTable waitlistPromise={waitlistPromise} />
            </div>
        </AppPageShell>
    );
}
