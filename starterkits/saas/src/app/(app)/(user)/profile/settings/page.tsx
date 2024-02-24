import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { UserNameForm } from "@/app/(app)/(user)/profile/settings/_components/user-name-form";
import { getUser } from "@/server/auth";
import { type User } from "next-auth";

export default async function SettingsPage() {
    const user = await getUser();

    return (
        <AppPageShell
            title="Profile Settings"
            description="This is the profile settings page. Here you can manage all the settings related to your profile."
        >
            <div className="mt-10">
                <UserNameForm user={user as User} />
            </div>
        </AppPageShell>
    );
}
