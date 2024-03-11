import { getUser } from "@/server/auth";

export default async function AdminDashPage() {
    const user = await getUser();

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome {user?.name}</p>
            <p>{user?.isNewUser ? "Yes" : "No"}</p>
        </div>
    );
}
