"use client";

import { env } from "@/env";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as CSPostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        rate_limiting: {
            events_burst_limit: 10,
            events_per_second: 5,
        },
        loaded: (posthog) => {
            if (env.NODE_ENV === "development") posthog.debug();
        },
    });
}

type PostHogProviderProps = {
    children: React.ReactNode;
};

export function PosthogProvider({ children }: PostHogProviderProps) {
    return (
        <>
            <CapturePageviewClient captureOnPathChange={true} />
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

type CapturePageviewClientProps = {
    captureOnPathChange?: boolean;
};

export function CapturePageviewClient({
    captureOnPathChange = false,
}: CapturePageviewClientProps) {
    const pathname = usePathname();

    useEffect(() => {
        const handleCapturePageview = () => posthog.capture("$pageview");

        handleCapturePageview();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [captureOnPathChange ? pathname : undefined]);

    return null;
}
