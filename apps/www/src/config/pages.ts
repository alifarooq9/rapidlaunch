import { siteUrls } from "@/config/urls";

interface Page {
    title: string;
    description: string;
    nav: { label: string; disabled?: boolean; href: string }[];
}

export const marketingPageConfig: Page = {
    title: "Marketing",
    description: "Marketing page",
    nav: [
        {
            label: "SaaS Starterkit",
            href: siteUrls.saasStarterkit.base,
        },
        {
            label: "Pricing",
            href: siteUrls.marketing.pricing,
        },
        {
            label: "Blocks",
            href: siteUrls.blocks.base,
        },
        {
            label: "Blog",
            href: siteUrls.marketing.blog,
        },
    ],
};
