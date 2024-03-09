"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import { useMutation } from "@tanstack/react-query";
import type { User } from "next-auth";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

type UserVerifyFormProps = {
    user: User;
};

export function UserVerifyForm({ user }: UserVerifyFormProps) {
    const { isPending, mutate } = useMutation({
        mutationFn: () =>
            signIn("email", {
                email: user.email,
                redirect: false,
                callbackUrl: siteUrls.profile.settings,
            }),
        onSuccess: () => {
            toast.success("Verification email sent! Check your inbox.");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to send verification email");
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Verify your email</CardTitle>
                <CardDescription>
                    Verify your email to enable all features
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button
                    disabled={isPending}
                    onClick={() => mutate()}
                    className="gap-2"
                >
                    {isPending ? <Icons.loader className="h-4 w-4" /> : null}
                    <span>Verify Email</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
