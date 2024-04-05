import Background from "@/components/background";
import { Header } from "@/components/header";
import Providers from "@/components/providers";
import { Toaster } from "@rapidlaunch/ui/sonner";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";

const TITLE =
    "Rapidlaunch | Open Source Nextjs SaaS Starterkits and Components";
const DESCRIPTION =
    "Launch your apps faster with our SaaS starterkits, components, building blocks. Customizable. Open Source";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        creator: "@AliFarooqDev",
        images: [
            "https://utfs.io/f/4ae0ddb1-4260-46f5-aa7c-70408cc192b9-aadavt.png",
        ],
    },
    openGraph: {
        type: "website",
        title: TITLE,
        description: DESCRIPTION,
        images: [
            {
                url: "https://utfs.io/f/4ae0ddb1-4260-46f5-aa7c-70408cc192b9-aadavt.png",
                width: 1280,
                height: 760,
                alt: "Rapidlaunch | Open Source Nextjs SaaS Starterkits and Components",
            },
        ],
        siteName: siteConfig.name,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${GeistSans.className}`}>
                <Providers>
                    <Background>
                        <Header />
                        {children}
                        <Toaster position="top-center" />
                    </Background>
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
