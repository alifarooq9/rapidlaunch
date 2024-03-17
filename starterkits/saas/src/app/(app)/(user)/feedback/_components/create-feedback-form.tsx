"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { createFeedbackMutation } from "@/server/actions/feedback/mutations";
import { feedback, feedbackInsertSchema } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

const createfeedbackFormSchema = feedbackInsertSchema.pick({
    title: true,
    message: true,
    label: true,
});

type CreateFeedbackFormSchema = z.infer<typeof createfeedbackFormSchema>;

export function CreateFeedbackForm() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<CreateFeedbackFormSchema>({
        resolver: zodResolver(createfeedbackFormSchema),
        defaultValues: {
            title: "",
            message: "",
            label: "Feature Request",
        },
    });

    const { isPending: isMutatePending, mutateAsync } = useMutation({
        mutationFn: () => createFeedbackMutation(form.getValues()),
    });

    const [isPending, startAwaitableTransition] = useAwaitableTransition();

    const onSubmit = async () => {
        try {
            await mutateAsync();

            await startAwaitableTransition(() => {
                router.refresh();
            });

            form.reset();
            setIsOpen(false);

            toast.success("Feedback submitted successfully");
        } catch (error) {
            toast.error(
                (error as { message?: string })?.message ??
                    "Failed to submit feedback",
            );
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(o) => {
                form.reset();
                setIsOpen(o);
            }}
        >
            <DialogTrigger asChild>
                <Button type="button">Give Feedback</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Give your feedback</DialogTitle>
                    <DialogDescription>
                        We appreciate your feedback and suggestions. Please
                        provide your feedback below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid w-full gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Title of your feedback"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Give a title to your feedback.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="What type of feedback is this?" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {feedback.label.enumValues.map(
                                                (label) => (
                                                    <SelectItem
                                                        key={label}
                                                        value={label}
                                                    >
                                                        {label}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select the type of feedback you are
                                        providing.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your feedback message"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Type your feedback message here.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        disabled={isPending || isMutatePending}
                        onClick={form.handleSubmit(onSubmit)}
                        className="gap-2"
                    >
                        {isPending || isMutatePending ? (
                            <Icons.loader className="h-4 w-4" />
                        ) : null}
                        <span>Submit Feedback</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
