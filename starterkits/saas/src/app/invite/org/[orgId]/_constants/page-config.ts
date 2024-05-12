export const invitePageConfig = {
    title: ({ orgName }: { orgName: string }) => `Invite to ${orgName}`,
    description: ({ orgName }: { orgName: string }) =>
        `Invite your team to ${orgName} and get started building your next project.`,
} as const;
