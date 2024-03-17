import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { adminFeedbackPageConfig } from "@/app/(app)/admin/feedbacks/_constants/page-config";
import { DataTable } from "@/app/(app)/admin/feedbacks/_components/data-table";
import { columns } from "@/app/(app)/admin/feedbacks/_components/columns";
import { getAllFeedbacksQuery } from "@/server/actions/feedback/queries";

export default async function AdminFeedbackPage() {
    const feedbackData = await getAllFeedbacksQuery();

    return (
        <AppPageShell
            title={adminFeedbackPageConfig.title}
            description={adminFeedbackPageConfig.description}
        >
            <div className="w-full">
                {/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */}

                <DataTable columns={columns} data={feedbackData} />
            </div>
        </AppPageShell>
    );
}
