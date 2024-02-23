"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session, update } = useSession();

    return (
        <div>
            <button onClick={async () => await update()}>Update</button>
            <p>{JSON.stringify(session?.user)}</p>
        </div>
    );
}
