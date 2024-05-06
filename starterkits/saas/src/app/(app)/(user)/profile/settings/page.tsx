import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { UserNameForm } from "@/app/(app)/(user)/profile/settings/_components/user-name-form";
import { UserImageForm } from "@/app/(app)/(user)/profile/settings/_components/user-image-form";
import { UserVerifyForm } from "@/app/(app)/(user)/profile/settings/_components/user-verify-form";
import { profileSettingsPageConfig } from "@/app/(app)/(user)/profile/settings/_constants/page-config";
import { UserAppearanceForm } from "@/app/(app)/(user)/profile/settings/_components/user-appearance-form";
import { getUser } from "@/server/auth";
import { type User } from "next-auth";

/**
 * This is the settings page for the user profile.
 * @add more settings related components here
 */

export default async function SettingsPage() {
    const user = await getUser();

    return (
        <AppPageShell
            title={profileSettingsPageConfig.title}
            description={profileSettingsPageConfig.description}
        >
            <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <UserImageForm user={user as User} />

                <UserNameForm user={user as User} />

                {user && !user.emailVerified && (
                    <UserVerifyForm user={user as User} />
                )}

                <UserAppearanceForm />
            </div>
        </AppPageShell>
    );
}
