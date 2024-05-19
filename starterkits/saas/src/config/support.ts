/**
 * @purpose Contains the support information for the support section.
 * The supportInfo array contains the support information for the support section.
 * Each object in the array contains the following properties:
 * - title: The title for the support information.
 * - description: The description for the support information.
 * - email: (Optional) The email address for the support information.
 * - buttonHref: The URL for the button.
 * - buttonText: The text for the button.
 *
 * After it will be used in the support section of the landing page. @see (websiteUrl)/support
 * You can modify support UI by modifying this file. @see /app/(web)/support/page.tsx
 */

import { siteUrls } from "@/config/urls";

export type SupportInfo = {
    title: string;
    description: string;
    email?: string;
    buttonHref: string;
    buttonText: string;
};

export const supportInfos: SupportInfo[] = [
    {
        title: "Say Hello",
        description:
            "Get in touch with us to learn more about our products and services.",
        email: "hello@example.com",
        buttonHref: `mailto:hello@example.com`,
        buttonText: "Get in touch",
    },
    {
        title: "Tech Support",
        description:
            "Get help with any technical issues you are facing. Our team will help you resolve any issues.",
        email: "tech@example.com",
        buttonHref: `mailto:tech@example.com`,
        buttonText: "Get in touch",
    },
    {
        title: "Sales",
        description:
            "Get help with any sales-related questions. Our team will help you with any sales inquiries.",
        email: "sales@example.com",
        buttonHref: `mailto:sales@example.com`,
        buttonText: "Get in touch",
    },
    {
        title: "Our Blog",
        description:
            "Read our blog to learn more about our products and the latest updates.",
        buttonHref: `${siteUrls.blogs}`,
        buttonText: "Read Blog",
    },
];
