import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
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
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { createOrgMutation } from "@/server/actions/organization/mutations";
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
    email: z.string().email("Invalid email address"),
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

            await startAwaitableTransition(() => {
                router.refresh();
            });

            setOpen(false);
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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
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

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                disabled={isPending || isMutatePending}
                                type="submit"
                                className="gap-2"
                            >
                                {isPending || isMutatePending ? (
                                    <Icons.loader className="h-4 w-4" />
                                ) : null}
                                <span>Create</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
