import React from "react";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import "@/styles/prism.css";
import { fontHeading, fontSans } from "@/lib/fonts";

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
