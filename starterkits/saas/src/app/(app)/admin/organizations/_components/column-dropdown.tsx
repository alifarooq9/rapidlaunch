"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";
import { type OrganizationsData } from "./columns";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteOrgAdminMutation } from "@/server/actions/organization/mutations";

export function ColumnDropdown({ id }: OrganizationsData) {
    const router = useRouter();

    const { mutateAsync: deleteUserMutate, isPending: deleteUserIsPending } =
        useMutation({
            mutationFn: () => deleteOrgAdminMutation({ id }),
            onSettled: () => {
                router.refresh();
            },
        });

    const deleteUser = () => {
        toast.promise(async () => await deleteUserMutate(), {
            loading: "Deleting user...",
            success: "User deleted!",
            error: (e) => {
                console.log(e);
                return "Failed to delete user.";
            },
        });
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={async () => {
                        await navigator.clipboard.writeText(id);
                        toast("User ID copied to clipboard");
                    }}
                >
                    Copy org ID
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    disabled={deleteUserIsPending}
                    onClick={deleteUser}
                    className="text-red-600"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
