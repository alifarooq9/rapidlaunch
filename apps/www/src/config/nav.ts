interface NavItem {
    label: string;
    href: string;
    disabled?: boolean;
}

interface NavConfig {
    items: NavItem[];
}

export const navConfig: NavConfig = {
    items: [
        {
            label: "SaaS StarterKit",
            href: "/saas-starterkit",
            disabled: true,
        },
        {
            label: "Blocks",
            href: "/blocks",
            disabled: true,
        },
        {
            label: "Docs",
            href: "/docs",
            disabled: true,
        },
        {
            label: "GitHub",
            href: "/gh",
        },
    ],
};
