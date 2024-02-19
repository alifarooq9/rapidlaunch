import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

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
            <body className={`${inter.className} overflow-x-hidden`}>
                <Providers>
                    {children}
                    <Toaster
                        richColors={true}
                        closeButton={true}
                        position="top-right"
                    />
                </Providers>
            </body>
        </html>
    );
}
