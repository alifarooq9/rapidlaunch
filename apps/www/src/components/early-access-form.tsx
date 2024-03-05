"use client";

import { Button } from "@rapidlaunch/ui/button";
import { Input } from "@rapidlaunch/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@rapidlaunch/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { joinEarlyAccessAction } from "@/server/actions";
import { Icons } from "@/components/icons";
import { toast } from "@rapidlaunch/ui/sonner";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

export function EarlyAccessForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const { isPending, mutate } = useMutation({
        mutationFn: () =>
            joinEarlyAccessAction({
                email: form.getValues().email,
                name: form.getValues().name,
            }),
        onSuccess: () => {
            form.reset();
            toast.success(`Thanks for joining early access! 🚀`, {
                description: `We'll keep you updated on our progress.`,
            });
        },
        onError: () => {
            toast.error(`Failed to join early access. 😢`, {
                description: `Please try again later.`,
            });
        },
    });

    function onSubmit() {
        mutate();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-sm space-y-2"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Name"
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Email"
                                    className="bg-background"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex w-full justify-end">
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full gap-2"
                    >
                        {isPending ? (
                            <Icons.loader className="h-4 w-4" />
                        ) : null}
                        <span>Join Early Access</span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
