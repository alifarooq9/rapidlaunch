"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
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
import { type organizations } from "@/server/db/schema";
import { updateOrgNameMutation } from "@/server/actions/organization/mutations";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";

const orgNameFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
});

export type OrgNameFormSchema = z.infer<typeof orgNameFormSchema>;

type OrgNameFormProps = {
    currentOrg: typeof organizations.$inferSelect;
};

export function OrgNameForm({ currentOrg }: OrgNameFormProps) {
    const router = useRouter();

    const form = useForm<OrgNameFormSchema>({
        resolver: zodResolver(orgNameFormSchema),
        defaultValues: {
            name: currentOrg.name ?? "",
        },
    });

    const { mutateAsync, isPending: isMutatePending } = useMutation({
        mutationFn: () =>
            updateOrgNameMutation({ name: form.getValues().name }),
    });

    const [isPending, startAwaitableTransition] = useAwaitableTransition();

    const onSubmit = async (values: OrgNameFormSchema) => {
        if (values.name === currentOrg.name) {
            return toast("Name is already set to this name");
        }

        try {
            await mutateAsync();

            await startAwaitableTransition(() => {
                router.refresh();
            });

            toast.success("Name updated successfully");
        } catch (error: unknown) {
            toast.error(
                (error as { message?: string })?.message ??
                    "Name could not be updated",
            );
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="flex h-full w-full flex-col justify-between">
                    <CardHeader>
                        <CardTitle>Org Name</CardTitle>
                        <CardDescription>
                            Please enter the name of your organization, this
                            will be used to identify your organization
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Ali's Org"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={isPending || isMutatePending}
                            type="submit"
                            className="gap-2"
                        >
                            {isPending || isMutatePending ? (
                                <Icons.loader className="h-4 w-4" />
                            ) : null}
                            <span>Save Changes</span>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
