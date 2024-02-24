"use client";

import { Slot } from "@radix-ui/react-slot";
import { signOut } from "next-auth/react";
import React from "react";

type SignoutTriggerProps = {
    callbackUrl?: string;
    redirect?: boolean;
    asChild?: boolean;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export function SignoutTrigger({
    callbackUrl,
    redirect = true,
    asChild,
    children,
    ...props
}: SignoutTriggerProps) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            onClick={async () => await signOut({ callbackUrl, redirect })}
            {...props}
        >
            {children}
        </Comp>
    );
}
