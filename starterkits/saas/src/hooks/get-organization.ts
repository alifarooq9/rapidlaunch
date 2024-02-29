"use server";

import { orgConfig } from "@/config/organization";
import { getUserOrgs } from "@/server/actions/organization";
import { type organizations } from "@/server/db/schema";
import { cookies } from "next/headers";

type OrganizationReturnType = {
    currentOrg: typeof organizations.$inferSelect;
    userOrgs: (typeof organizations.$inferSelect)[];
};

export async function getOrganization(): Promise<OrganizationReturnType> {
    const userOrgs = await getUserOrgs();

    const defaultOrg = cookies().get(orgConfig.cookieName)?.value;

    const currentOrg =
        userOrgs.find((org) => org.id === defaultOrg) ?? userOrgs[0];

    return {
        currentOrg: currentOrg as typeof organizations.$inferSelect,
        userOrgs,
    };
}
