import React from "react";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { fontHeading, fontSans } from "@/lib/fonts";
import { type Metadata } from "next";
import {
    defaultMetadata,
    twitterMetadata,
    ogMetadata,
} from "@/app/shared-metadata";

export const metadata: Metadata = {
    ...defaultMetadata,
    twitter: {
        ...twitterMetadata,
    },
    openGraph: {
        ...ogMetadata,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fontSans.variable} ${fontHeading.variable} overflow-x-hidden font-sans`}
            >
                <Providers>
                    {children}
                    <Toaster richColors position="top-right" expand />
                </Providers>
            </body>
        </html>
    );
}
