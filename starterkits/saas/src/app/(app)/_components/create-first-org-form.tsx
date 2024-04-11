import { getOrganizations } from "@/server/actions/organization/queries";
import { NewUserOrgForm } from "@/app/(app)/_components/new-user-org-form";
import { getUser } from "@/server/auth";

export async function CreateFirstOrgForm() {
    const { userOrgs } = await getOrganizations();

    const user = await getUser();

    if (userOrgs.length === 0 && !user!.isNewUser) {
        return (
            <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center bg-black/80">
                <div className="w-full max-w-xl">
                    <NewUserOrgForm userId={user!.id} prevBtn={false} />
                </div>
            </div>
        );
    }

    return null;
}
