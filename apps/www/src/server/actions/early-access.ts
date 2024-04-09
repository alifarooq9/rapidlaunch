"use server";

import { earlyAccess } from "@rapidlaunch/db/schema";
import { db } from "@rapidlaunch/db";

interface JoinEarlyAccessProps {
    email: string;
    name: string;
}

export async function joinEarlyAccessAction({
    email,
    name,
}: JoinEarlyAccessProps) {
    return await db
        .insert(earlyAccess)
        .values({ email, name })
        .onConflictDoNothing({ target: earlyAccess.email })
        .returning({ insertedName: earlyAccess.name })
        .execute();
}
