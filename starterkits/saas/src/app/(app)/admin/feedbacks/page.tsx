import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { adminFeedbackPageConfig } from "@/app/(app)/admin/feedbacks/_constants/page-config";
import { getAllPaginatedFeedbacksQuery } from "@/server/actions/feedback/queries";
import { FeedbacksTable } from "./_components/feedbacks-table";
import { z } from "zod";
import type { SearchParams } from "@/types/data-table";

const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    title: z.string().optional(),
    status: z.string().optional(),
    label: z.string().optional(),
    operator: z.string().optional(),
});

type AdminFeedbackPageProps = {
    searchParams: SearchParams;
};

export default async function AdminFeedbackPage({
    searchParams,
}: AdminFeedbackPageProps) {
    const search = searchParamsSchema.parse(searchParams);

    const feedbacksPromise = getAllPaginatedFeedbacksQuery(search);

    return (
        <AppPageShell
            title={adminFeedbackPageConfig.title}
            description={adminFeedbackPageConfig.description}
        >
            <div className="w-full">
                <FeedbacksTable feedbacksPromise={feedbacksPromise} />
            </div>
        </AppPageShell>
    );
}
