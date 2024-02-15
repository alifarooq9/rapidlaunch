"use client";

import { signOut } from "next-auth/react";

export default function DashboardPage() {
    const logout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}
