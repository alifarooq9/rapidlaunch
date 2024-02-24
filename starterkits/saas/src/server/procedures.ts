"use server";
/**
 * @purpose This file contains all the server procedures
 */

import { getUser } from "@/server/auth";
import { type User } from "next-auth";

/**
 * @purpose This is a protected procedure
 * @description This procedure is protected and can only be accessed by authenticated users
 * */

export const protectedProcedure = async () => {
    const user = await getUser();

    if (!user) {
        throw new Error("You is not authenticated");
    }

    return {
        user: user as User,
    }
};
