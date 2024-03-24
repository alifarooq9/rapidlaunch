"use client";

import { Icons } from "@/components/ui/icons";
import { create } from "zustand";

type SwitchOrgPendingState = {
    isPending: boolean;
    setIsPending: (value: boolean) => void;
};

export const switchOrgPendingState = create<SwitchOrgPendingState>()((set) => ({
    isPending: false,
    setIsPending: (value) => set({ isPending: value }),
}));

export function SwtichOrgLoading() {
    const { isPending } = switchOrgPendingState();

    if (!isPending) return null;

    return (
        <div
            aria-description="Org Switching Loading"
            className="fixed inset-0 z-[20000] flex h-screen w-screen flex-col items-center justify-center gap-2 bg-background"
        >
            <Icons.loader className="h-7 w-7" />
            <p className="text-lg font-semibold">Switching Org...</p>
        </div>
    );
}
