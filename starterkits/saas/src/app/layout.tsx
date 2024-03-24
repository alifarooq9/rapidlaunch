import React from "react";
import Background from "@/components/background";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { fontSans } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";

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
            <body
                className={`${fontSans.className} overflow-x-hidden font-sans`}
            >
                <Providers>
                    <Background>{children}</Background>
                    <Toaster richColors position="top-right" expand />
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
