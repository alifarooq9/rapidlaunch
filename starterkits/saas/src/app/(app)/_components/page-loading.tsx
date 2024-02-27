import React from "react";
import { AppPageShell } from "@/app/(app)/_components/page-shell";

type AppPageLoadingProps = {
    title: string;
    description: string;
    children: React.ReactNode;
};

export function AppPageLoading({
    title,
    description,
    children,
}: AppPageLoadingProps) {
    return (
        <AppPageShell title={title} description={description}>
            <div className="w-full">{children}</div>
        </AppPageShell>
    );
}
