import { getOrgById } from "@/server/actions/organization";
import { RequestCard } from "@/app/invite/org/[orgId]/_components/request-card";

type OrgRequestProps = {
    params: {
        orgId: string;
    };
};

export default async function OrgRequestPage({
    params: { orgId },
}: OrgRequestProps) {
    const org = await getOrgById({ orgId });

    return (
        <main className="container flex min-h-screen flex-col items-center justify-center">
            <RequestCard org={org} orgId={orgId} />
        </main>
    );
}
