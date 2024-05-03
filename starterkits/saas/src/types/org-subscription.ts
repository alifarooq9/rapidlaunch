import type { getOrgSubscription } from "@/server/actions/subscription/query";

export type OrgSubscription = Awaited<ReturnType<typeof getOrgSubscription>>;
