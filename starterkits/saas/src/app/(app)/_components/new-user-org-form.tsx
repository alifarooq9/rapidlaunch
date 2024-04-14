"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { new_user_setup_step_cookie } from "@/config/cookie-keys";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { createOrgMutation } from "@/server/actions/organization/mutations";
import { completeNewUserSetupMutation } from "@/server/actions/user/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createOrgFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
    email: z.string().email("Invalid email address"),
});

type CreateOrgFormSchema = z.infer<typeof createOrgFormSchema>;

type NewUserOrgFormProps = {
    currentStep?: number;
    userId: string;
    prevBtn?: boolean;
};

export function NewUserOrgForm({
    currentStep,
    userId,
    prevBtn = true,
}: NewUserOrgFormProps) {
    const router = useRouter();

    const [isPrevPending, startPrevTransition] = useAwaitableTransition();

    const handlePrev = async () => {
        await startPrevTransition(() => {
            if (currentStep) {
                document.cookie = `${new_user_setup_step_cookie}${userId}=${currentStep - 1}; path=/`;
            }
            router.refresh();
        });
    };

    const {
        mutateAsync: completeNewUserMutate,
        isPending: isCompleteNewUserPending,
    } = useMutation({
        mutationFn: () => completeNewUserSetupMutation(),
    });

    const form = useForm<CreateOrgFormSchema>({
        resolver: zodResolver(createOrgFormSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const { mutateAsync, isPending: isMutatePending } = useMutation({
        mutationFn: ({ name, email }: { name: string; email: string }) =>
            createOrgMutation({ name, email }),
    });

    const [isPending, startAwaitableTransition] = useAwaitableTransition();

    const onSubmit = async (values: CreateOrgFormSchema) => {
        try {
            await mutateAsync(values);

            await completeNewUserMutate();

            await startAwaitableTransition(() => {
                router.refresh();
            });

            form.reset();

            toast.success("Organization created successfully");
        } catch (error) {
            toast.error(
                (error as { message?: string })?.message ??
                    "Organization could not be created",
            );
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Setup your organization
                        </CardTitle>
                        <CardDescription>
                            Create an organization to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Org Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="hey@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the email of your organization.
                                        This could be your personal email or a
                                        shared email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Org Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ali's Org"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the name of your organization.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex items-center justify-end gap-2">
                        {prevBtn ? (
                            <Button
                                disabled={isPrevPending}
                                onClick={handlePrev}
                                className="gap-2"
                                variant="outline"
                                type="button"
                            >
                                {isPrevPending ? (
                                    <Icons.loader className="h-4 w-4" />
                                ) : null}
                                <span>Previous</span>
                            </Button>
                        ) : null}
                        <Button
                            disabled={
                                isPending ||
                                isMutatePending ||
                                isCompleteNewUserPending
                            }
                            type="submit"
                            className="gap-2"
                        >
                            {isPending ||
                            isMutatePending ||
                            isCompleteNewUserPending ? (
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
