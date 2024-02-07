"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { siteUrls } from "@/config/urls";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialLogins } from "@/app/auth/_components/social-logins";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type formSchemaType = z.infer<typeof formSchema>;

interface AuthFormProps {
    type: "signup" | "login";
}

export function AuthForm({ type }: AuthFormProps) {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(data: formSchemaType) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg w-full max-w-sm space-y-6"
            >
                <div className="flex flex-col items-center space-y-4">
                    <Link
                        href={siteUrls.home}
                        className="flex w-fit items-center transition-transform hover:scale-90"
                    >
                        <Icons.logo className="h-10 w-10 fill-primary" />
                    </Link>
                    <div className="flex flex-col items-center space-y-1">
                        <h1 className="text-center text-2xl font-medium">
                            {type === "signup"
                                ? " Create an account"
                                : "Login to your account"}
                        </h1>
                        <Link
                            href={
                                type === "signup"
                                    ? siteUrls.auth.login
                                    : siteUrls.auth.signup
                            }
                            className="text-center text-sm text-muted-foreground underline underline-offset-4"
                        >
                            {type === "signup"
                                ? "Already have an account? Login"
                                : "Don't have an account? SignUp"}
                        </Link>
                    </div>
                </div>

                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="hey@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    We&apos;ll never share your email with
                                    anyone else.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Continue with Email
                    </Button>
                </div>

                <div className="relative flex items-center justify-center">
                    <Separator className="w-full" />
                    <p className="absolute bg-background px-2 text-sm font-medium text-muted-foreground">
                        OR
                    </p>
                </div>

                <SocialLogins />
            </form>
        </Form>
    );
}
