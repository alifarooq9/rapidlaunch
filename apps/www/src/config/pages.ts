import { siteUrls } from "@/config/urls";

interface Page {
    title: string;
    description: string;
}

interface MarketingPageConfig extends Page {
    nav: {
        label: string;
        href: string;
    }[];
}

export const marketingPageConfig: MarketingPageConfig = {
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
