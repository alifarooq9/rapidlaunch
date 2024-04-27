"use client";

import { env } from "@/env";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as CSPostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
        rate_limiting: {
            events_burst_limit: 7,
            events_per_second: 3,
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
            <PageviewCapture />
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

type PageviewCaptureProps = {
    /**
     * Capture pageview on pathname change (default: false)
     */
    captureOnPathChange?: boolean;
};

export function PageviewCapture({
    captureOnPathChange = false,
}: PageviewCaptureProps) {
    const pathname = usePathname();

    useEffect(() => {
        const pageviewEventCapture = () => posthog.capture("$pageview");

        if (typeof window !== "undefined") {
            window.addEventListener("load", pageviewEventCapture);
            return () => {
                window.removeEventListener("load", pageviewEventCapture);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [captureOnPathChange ? pathname : undefined]);

    return null;
}
