"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
    FormField,
    FormItem,
    FormMessage,
    FormControl,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { waitlistUsersSchema } from "@/server/db/schema";
import { useMutation } from "@tanstack/react-query";
import { addUserToWaitlistMutation } from "@/server/actions/waitlist/mutations";
import { toast } from "sonner";
import { Icons } from "@/components/ui/icons";

const waitformSchema = waitlistUsersSchema.pick({
    name: true,
    email: true,
});

type waitformSchemaType = z.infer<typeof waitformSchema>;

export function WaitlistForm() {
    const form = useForm<waitformSchemaType>({
        resolver: zodResolver(waitformSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => addUserToWaitlistMutation(form.getValues()),
        onSuccess: () => {
            toast("You have been added to waitlist", {
                description: "You will be notified when the waitlist opens",
            });
        },
        onError: () => {
            toast.error("Something went wrong", {
                description: "Please try again later",
            });
        },
    });

    const onSubmit = async () => {
        mutate();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full max-w-md gap-4"
            >
                <div className="grid w-full grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="h-10 w-full bg-background"
                                        placeholder="Name"
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
                                        className="h-10 w-full bg-background"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full gap-2"
                >
                    {isPending ? <Icons.loader className="h-4 w-4" /> : null}
                    <span>Join the waitlist</span>
                </Button>
            </form>
        </Form>
    );
}
