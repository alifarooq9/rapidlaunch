"use client";

import { env } from "@/env";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider as CSPostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        rate_limiting: {
            events_burst_limit: 7,
            events_per_second: 3,
        },
        loaded: (posthog) => {
            if (env.NODE_ENV === "development") posthog.debug();
        },
        capture_pageview: true,
        capture_pageleave: true,
    });
}

type PostHogProviderProps = {
    children: React.ReactNode;
};

export function PosthogProvider({ children }: PostHogProviderProps) {
    return (
        <>
            <CSPostHogProvider client={posthog}>
                <PosthogAuthWrapper>{children}</PosthogAuthWrapper>
            </CSPostHogProvider>
        </>
    );
}

function PosthogAuthWrapper({ children }: PostHogProviderProps) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            posthog.identify(session.user.id, {
                email: session.user.email,
                name: session.user.name,
            });
        } else if (status === "unauthenticated") {
            posthog.reset();
        }
    }, [session, status]);

    return children;
}
