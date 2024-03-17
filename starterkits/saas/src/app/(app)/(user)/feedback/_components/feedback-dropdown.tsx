"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeUserFeedbackMutation } from "@/server/actions/feedback/mutations";
import { useMutation } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";
import { toast } from "sonner";
import { type feedbackSelectSchema } from "@/server/db/schema";
import type { z } from "zod";
import { useRouter } from "next/navigation";

type FeedbackDropdownProps = z.infer<typeof feedbackSelectSchema>;

export function FeedbackDropdown(props: FeedbackDropdownProps) {
    const router = useRouter();

    const {
        mutateAsync: removeFeedbackMutate,
        isPending: isRemoveFeedbackPending,
    } = useMutation({
        mutationFn: () => removeUserFeedbackMutation({ id: props.id }),
        onSettled: () => {
            router.refresh();
        },
    });

    const handleRemoveFeedback = async () => {
        toast.promise(async () => removeFeedbackMutate(), {
            loading: "Removing feedback...",
            success: "Feedback removed successfully",
            error: "Failed to remove feedback",
        });
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="absolute right-3 top-3 h-8 w-8 p-0"
                >
                    <span className="sr-only">Open menu</span>
                    <MoreVerticalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    disabled={isRemoveFeedbackPending}
                    onClick={handleRemoveFeedback}
                    className="text-red-600"
                >
                    Remove
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
