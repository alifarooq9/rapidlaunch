import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { UseOrgTransition } from "@/hooks/use-org-transition";
import { createOrgAction } from "@/server/actions/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createOrgFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
});

export type CreateOrgFormSchema = z.infer<typeof createOrgFormSchema>;

type CreateOrgFormProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreateOrgForm({ open, setOpen }: CreateOrgFormProps) {
    const router = useRouter();

    const form = useForm<CreateOrgFormSchema>({
        resolver: zodResolver(createOrgFormSchema),
        defaultValues: {
            name: "",
        },
    });

    const { startTransition } = UseOrgTransition();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: ({ name }: { name: string }) => createOrgAction({ name }),
        onSuccess: () => {
            toast.success("Name updated successfully");
            setOpen(false);
            form.reset();
            startTransition(() => {
                router.refresh();
            });
        },
        onError: (error: { message?: string } = {}) =>
            toast.error(
                error.message ??
                    "Failed to update name, please try again later",
            ),
        onSettled: () => router.refresh(),
    });

    const onSubmit = async (values: CreateOrgFormSchema) => {
        await mutateAsync(values);
    };

    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Organization</DialogTitle>
                    <DialogDescription>
                        Create a new organization for your team to collaborate
                        and work together.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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

                        <DialogFooter>
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="gap-2"
                            >
                                {isPending && (
                                    <Icons.loader className="h-4 w-4" />
                                )}
                                <span>Create</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
