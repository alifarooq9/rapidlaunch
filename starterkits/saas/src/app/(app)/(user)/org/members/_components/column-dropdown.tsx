"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { membersToOrganizationsRoleEnum } from "@/server/db/schema";
import { toast } from "sonner";
import { type MembersData } from "@/app/(app)/(user)/org/members/_components/columns";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
    removeUserMutation,
    updateMemberRoleMutation,
} from "@/server/actions/organization/mutations";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";

type Role = (typeof membersToOrganizationsRoleEnum.enumValues)[number];

export function ColumnDropdown({ role, memberId }: MembersData) {
    const router = useRouter();

    const { mutateAsync: changeRoleMutate, isPending: changeRoleIsPending } =
        useMutation({
            mutationFn: ({ role }: { role: Role }) => {
                return updateMemberRoleMutation({ memberId, role });
            },
            onSettled: () => {
                router.refresh();
            },
        });

    const [roleChangeIsTransitionPending, startAwaitableRoleChangeTransition] =
        useAwaitableTransition();

    const onRoleChange = (role: Role) => {
        toast.promise(
            async () => {
                await changeRoleMutate({ role });
                await startAwaitableRoleChangeTransition(() => {
                    router.refresh();
                });
            },
            {
                loading: "Updating user role...",
                success: "User role updated!",
                error: "Failed to update user role, Check your permissions.",
            },
        );
    };

    const {
        mutateAsync: removeMemberMutate,
        isPending: removeMemberIsPending,
    } = useMutation({
        mutationFn: ({ memberId }: { memberId: string }) =>
            removeUserMutation({ memberId }),
    });

    const [
        removeMemberIsTransitionPending,
        startAwaitableRemoveMemberTransition,
    ] = useAwaitableTransition();

    const onRemoveMember = async () => {
        toast.promise(
            async () => {
                await removeMemberMutate({
                    memberId,
                });
                await startAwaitableRemoveMemberTransition(() => {
                    router.refresh();
                });
            },
            {
                loading: "Removing user...",
                success: "User removed ",
                error: "Failed to remove user.",
            },
        );
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

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Edit role</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                            value={role}
                            onValueChange={(r) => onRoleChange(r as Role)}
                        >
                            {membersToOrganizationsRoleEnum.enumValues.map(
                                (currentRole) => (
                                    <DropdownMenuRadioItem
                                        key={currentRole}
                                        value={currentRole}
                                        disabled={
                                            changeRoleIsPending ||
                                            roleChangeIsTransitionPending
                                        }
                                    >
                                        {currentRole}
                                    </DropdownMenuRadioItem>
                                ),
                            )}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    disabled={
                        removeMemberIsPending || removeMemberIsTransitionPending
                    }
                    onClick={onRemoveMember}
                    className="text-red-600"
                >
                    Remove
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
