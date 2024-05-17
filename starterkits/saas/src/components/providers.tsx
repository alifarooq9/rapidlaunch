"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { PosthogProvider } from "@/components/posthog-provider";
import { SessionProvider } from "next-auth/react";
import { RootProvider as FumaDocsProviders } from "fumadocs-ui/provider";

type ProvidersProps = {
    children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
    const queryClient = new QueryClient();

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <PosthogProvider>
                    <FumaDocsProviders>
                        <ThemeProvider>{children}</ThemeProvider>
                    </FumaDocsProviders>
                </PosthogProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
