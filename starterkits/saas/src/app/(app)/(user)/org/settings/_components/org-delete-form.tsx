"use client";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { deleteOrgMutation } from "@/server/actions/organization/mutations";
import { setOrgCookie } from "@/lib/utils";
import { siteUrls } from "@/config/urls";

const confirmationText = "DELETE MY ORG";

const deleteOrgFormSchema = z.object({
    confirmation: z
        .string({ required_error: `Type "${confirmationText}" to confirms` })
        .min(1, `Type "${confirmationText}" to confirms`),
});

export type DeleteOrgFormSchema = z.infer<typeof deleteOrgFormSchema>;

type DeleteYourOrgFormProps = {
    fallbackOrgId: string;
};

export function DeleteYourOrgForm({ fallbackOrgId }: DeleteYourOrgFormProps) {
    const router = useRouter();

    const form = useForm<DeleteOrgFormSchema>({
        resolver: zodResolver(deleteOrgFormSchema),
    });

    const { isPending: isMutatePending, mutateAsync } = useMutation({
        mutationFn: () => deleteOrgMutation(),
    });

    const [isPending, startAwaitableTransition] = useAwaitableTransition();

    async function onSubmit(data: DeleteOrgFormSchema) {
        if (data.confirmation !== confirmationText) {
            return form.setError("confirmation", {
                message: `Type "${confirmationText}" to confirms`,
            });
        }

        try {
            await mutateAsync();

            await startAwaitableTransition(() => {
                setOrgCookie(fallbackOrgId);
                router.refresh();
                form.reset();
            });

            router.push(siteUrls.dashboard.home);

            toast.success("Org deleted successfully");
        } catch (error: unknown) {
            toast.error(
                (error as { message?: string })?.message ??
                    "Could not delete the org",
            );
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Delete Org</CardTitle>
                        <CardDescription>
                            Type{" "}
                            <span className="font-bold">
                                {confirmationText}
                            </span>{" "}
                            to permanently delete your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder={confirmationText}
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
                            disabled={isMutatePending || isPending}
                            variant="destructive"
                            type="submit"
                            className="gap-2"
                        >
                            {isPending || isMutatePending ? (
                                <Icons.loader className="h-4 w-4" />
                            ) : null}
                            <span>Delete My Org</span>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
