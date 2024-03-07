import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { orgMembersInvitePageConfig } from "@/app/(app)/(user)/org/members/invite/_constants/page-config";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import {
    getOrgRequestsAction,
    getOrganizations,
} from "@/server/actions/organization";
import { ShareInviteLink } from "@/app/(app)/(user)/org/members/invite/_components/share-invite-link";
import { OrgRequests } from "@/app/(app)/(user)/org/members/invite/_components/org-requests";

export default async function OrgMemberInvite() {
    const { currentOrg } = await getOrganizations();

    const inviteLink = `${env.NEXTAUTH_URL}/invite/org/${currentOrg.id}`;

    const requests = await getOrgRequestsAction();

    return (
        <AppPageShell
            title={orgMembersInvitePageConfig.title}
            description={orgMembersInvitePageConfig.description}
        >
            <div className="w-full space-y-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Share the link to invite</CardTitle>
                        <CardDescription>
                            Invite a new member to your organization by sharing
                            the link below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ShareInviteLink inviteLink={inviteLink} />
                        <Separator className="my-4" />

                        <OrgRequests requests={requests} />
                    </CardContent>
                </Card>
            </div>
        </AppPageShell>
    );
}
