"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type ShareInviteLinkProps = {
    inviteLink: string;
};

export function ShareInviteLink({ inviteLink }: ShareInviteLinkProps) {
    const [isPending, setIsPending] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const copyLink = async () => {
        setIsPending(true);
        await navigator.clipboard.writeText(inviteLink);
        setIsCopied(true);
        setIsPending(false);
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isCopied) {
            timeout = setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isCopied]);

    return (
        <div className="flex gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full space-x-2">
                <Input value={inviteLink} readOnly />
                <Button
                    disabled={isPending}
                    variant="secondary"
                    className="shrink-0"
                    onClick={copyLink}
                >
                    {isCopied ? "Copied" : "Copy Link"}
                </Button>
            </div>
        </div>
    );
}
