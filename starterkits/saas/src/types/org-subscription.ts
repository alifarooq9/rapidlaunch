import type { getOrgSubscription } from "@/server/actions/plans/query";

export type OrgSubscription = Awaited<ReturnType<typeof getOrgSubscription>>;
