"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendOrgInviteEmail } from "@/server/actions/send-org-invite-email";
import { useEffect, useState } from "react";
import { toast } from "sonner";


type SendInviteLinkProps = {
    inviteLink: string;
    orgName: string;
};

export function SendInviteLink({ inviteLink, orgName }: SendInviteLinkProps) {
    const [isPending, setIsPending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [sendInviteEmail, setSendInviteEmail] = useState("");

    const sendInvite = async () => {
        setIsPending(true);
        const sendInvitePromise = () => sendOrgInviteEmail({
            email: sendInviteEmail,
            orgName: orgName,
            invLink: inviteLink
        });

        toast.promise(sendInvitePromise(), {
            loading: 'Sending invite...',
            success: () => {
                setIsSent(true);
                return "Invite sent";
            },
            error: 'Error sending invite',
            finally() {
                setIsPending(false);
            },
        });
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isSent) {
            timeout = setTimeout(() => {
                setIsSent(false);
            }, 3000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isSent]);

    return (
        <div className="flex gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full space-x-2">
                <Input value={sendInviteEmail} type="email" onChange={(e) => setSendInviteEmail(e.target.value)} placeholder="Email" />
                <Button
                    disabled={isPending}
                    variant="secondary"
                    className="shrink-0"
                    onClick={sendInvite}
                >
                    {isSent ? "Invite Sent" : "Send Invite"}
                </Button>
            </div>
        </div>
    );
}
