"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendOrgInviteEmail } from "@/server/actions/send-org-invite-email";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";



const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type formSchemaType = z.infer<typeof formSchema>;

type SendInviteLinkProps = {
    inviteLink: string;
    orgName: string;
};

export function SendInviteLink({ inviteLink, orgName }: SendInviteLinkProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSumbmit = async (data: formSchemaType) => {
        setIsLoading(true);
        const sendInvitePromise = () => sendOrgInviteEmail({
            email: data.email,
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
                setIsLoading(false);
                form.reset({ email: "" });
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSumbmit)}
                className="flex gap-4 md:flex-row md:items-center md:justify-between"
            >
                <div className="flex w-full space-x-2">
                    <div className="w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="bg-background w-full"
                                        placeholder="hey@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <Button
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        variant="secondary"
                        className="shrink-0"
                        type="submit"
                    >
                        {isLoading && <Icons.loader className="h-4 w-4 mr-2" />}
                        {isSent ? "Invite Sent" : "Send Invite"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
