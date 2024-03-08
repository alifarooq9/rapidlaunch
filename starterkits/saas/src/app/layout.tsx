import React from "react";
import Background from "@/components/background";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata = {
    title: "RapidLaunch - Next.js Boilerplate",
    description:
        "Next.js boilerplate with shadcn ui, TRPC, TailwindCSS, and Drizzle.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${GeistSans.className} overflow-x-hidden`}>
                <Providers>
                    <Toaster richColors position="top-right" expand />
                    <Background>{children}</Background>
                </Providers>
            </body>
        </html>
    );
}
