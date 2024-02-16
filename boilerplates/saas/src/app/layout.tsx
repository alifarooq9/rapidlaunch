import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Bricolage_Grotesque } from "next/font/google";

const bricolageGrotesque = Bricolage_Grotesque({
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
            <body
                className={`${bricolageGrotesque.className} overflow-x-hidden`}
            >
                <ThemeProvider>
                    <TRPCReactProvider>
                        {children}
                        <Toaster
                            richColors={true}
                            closeButton={true}
                            position="top-right"
                        />
                    </TRPCReactProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
