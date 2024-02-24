import { AppPageShell } from "@/app/(app)/_components/page-shell";

export default function UsersPage() {
    return (
        <AppPageShell
            title="Users"
            description="View all users in your app. Perform actions such as creating new users, sending users login links, debug bugs your users face by logging in as them and more!"
        >
            Users Page
        </AppPageShell>
    );
}
