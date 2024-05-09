"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    FormField,
    FormItem,
    FormMessage,
    FormControl,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const waitformSchema = z.object({
    name: z.string().min(2, "Please enter a valid name"),
    email: z.string().email("Please enter a valid email address"),
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

    const onSubmit = async (data: waitformSchemaType) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="h-10 w-full bg-background sm:w-auto"
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
                                        className="h-10 w-full bg-background sm:w-auto"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Join the waitlist
                </Button>
            </form>
        </Form>
    );
}
