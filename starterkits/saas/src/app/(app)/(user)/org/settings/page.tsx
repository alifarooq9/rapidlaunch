import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { orgSettingsPageConfig } from "@/app/(app)/(user)/org/settings/_constants/page-config";
import { OrgNameForm } from "@/app/(app)/(user)/org/settings/_components/org-name-form";
import { getOrganizations } from "@/server/actions/organization";

export default async function OrgSettingsPage() {
    const { currentOrg } = await getOrganizations();

    return (
        <AppPageShell
            title={orgSettingsPageConfig.title}
            description={orgSettingsPageConfig.description}
        >
            <div className="w-full">
                <OrgNameForm currentOrg={currentOrg} key={currentOrg.id} />
            </div>
        </AppPageShell>
    );
}
