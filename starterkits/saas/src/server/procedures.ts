"use server";
/**
 * @purpose This file contains all the server procedures
 */

import { getUser } from "@/server/auth";
import { type User } from "next-auth";
import { usersRoleEnum } from "@/server/db/schema";
import { z } from "zod";

const userRoles = z.enum(usersRoleEnum.enumValues);

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
    };
};

/**
 * @purpose This is an admin procedure
 * @description This procedure is protected and can only be accessed by admins
 * */

export const adminProcedure = async () => {
    const user = await getUser();

    if (
        user &&
        user.role !== userRoles.Values.Admin &&
        user.role !== userRoles.Values["Super Admin"]
    ) {
        throw new Error("You are not authorized to perform this action");
    }

    return {
        user: user as User,
    };
};

/**
 * @purpose This is a super admin procedure
 * @description This procedure is protected and can only be accessed by super admins
 * */

export const superAdminProcedure = async () => {
    const user = await getUser();

    if (user && user.role !== userRoles.Values["Super Admin"]) {
        throw new Error("You are not authorized to perform this action");
    }

    return {
        user: user as User,
    };
};
