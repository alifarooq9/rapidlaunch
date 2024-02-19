"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
    children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider>
            <SessionProvider>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
