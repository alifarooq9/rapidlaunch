"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "next-auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { useMutation } from "@tanstack/react-query";
import { updateNameMutation } from "@/server/actions/user/mutations";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { siteConfig } from "@/config/site";
import { new_user_setup_step_cookie } from "@/config/cookie-keys";

const profileFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;

type NewUserProfileFormProps = {
    user: User;
    currentStep: number;
};

export function NewUserProfileForm({
    user,
    currentStep,
}: NewUserProfileFormProps) {
    const router = useRouter();

    const form = useForm<ProfileFormSchema>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user.name ?? "",
        },
    });

    const { isPending: isMutatePending, mutateAsync } = useMutation({
        mutationFn: () => updateNameMutation({ name: form.getValues().name }),
    });

    const [isPending, startAwaitableTransition] = useAwaitableTransition();

    const onSubmit = async () => {
        try {
            await mutateAsync();

            await startAwaitableTransition(() => {
                document.cookie = `${new_user_setup_step_cookie}${user.id}=${currentStep + 1}; path=/`;
                router.refresh();
            });

            toast.success("Profile setup complete!");
        } catch (error) {
            toast.error(
                (error as { message?: string })?.message ??
                    "An error occurred while updating your profile",
            );
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Welcome to {siteConfig.name}
                        </CardTitle>
                        <CardDescription>
                            Please set up your profile to get started
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="alidotm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your full name to get started
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input value={user?.email ?? ""} readOnly />
                            </FormControl>
                            <FormDescription>
                                This is the email you used to sign up
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </CardContent>

                    <CardFooter className="flex items-center justify-end gap-2">
                        <Button
                            disabled={isPending || isMutatePending}
                            type="submit"
                            className="gap-2"
                        >
                            {isPending || isMutatePending ? (
                                <Icons.loader className="h-4 w-4" />
                            ) : null}
                            <span>Continue</span>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
