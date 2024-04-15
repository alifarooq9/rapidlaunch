"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, setOrgCookie } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
import { CreateOrgForm } from "@/app/(app)/_components/create-org-form";
import { type organizations } from "@/server/db/schema";
import { useAwaitableTransition } from "@/hooks/use-awaitable-transition";
import { useRouter } from "next/navigation";
import { switchOrgPendingState } from "@/app/(app)/_components/org-switch-loading";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export type UserOrgs = {
    heading: string;
    items: (typeof organizations.$inferSelect)[];
};

type OrgSelectDropdownProps = {
    currentOrg: typeof organizations.$inferSelect;
    userOrgs: UserOrgs[];
};

export function OrgSelectDropdown({
    currentOrg,
    userOrgs,
}: OrgSelectDropdownProps) {
    const router = useRouter();

    const isCollapsed = false;

    const { setIsPending } = switchOrgPendingState();

    const [, startAwaitableTransition] = useAwaitableTransition();

    const onOrgChange = async (orgId: string) => {
        setIsPending(true);
        setOrgCookie(orgId);
        await startAwaitableTransition(() => {
            router.refresh();
        });
        setIsPending(false);
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [popOpen, setPopOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <CreateOrgForm open={modalOpen} setOpen={setModalOpen} />

            <Popover
                modal={false}
                open={popOpen}
                onOpenChange={(o: boolean) => setPopOpen(o)}
            >
                <PopoverTrigger asChild role="combobox">
                    <Button
                        variant="outline"
                        className={cn(
                            "flex w-full justify-start gap-2 overflow-hidden p-2",
                        )}
                        aria-label="select organization"
                    >
                        <Avatar className="h-6 w-6">
                            <AvatarImage
                                src={currentOrg?.image ? currentOrg.image : ""}
                            />

                            <AvatarFallback className="text-xs">
                                {currentOrg?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        {!isCollapsed && (
                            <span className="truncate">{currentOrg?.name}</span>
                        )}

                        <span className="sr-only">org select menu</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50 w-60 p-0" align="start">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search team..." />
                            <CommandEmpty>No team found.</CommandEmpty>

                            {userOrgs.map((group, index) => (
                                <CommandGroup
                                    heading={group.heading}
                                    key={index}
                                >
                                    {group.items.length > 0 ? (
                                        group.items.map((org) => (
                                            <CommandItem
                                                key={org.id}
                                                onSelect={async () => {
                                                    setPopOpen(false);
                                                    await onOrgChange(org.id);
                                                }}
                                                className="text-sm"
                                            >
                                                <Avatar className="mr-2 h-5 w-5">
                                                    <AvatarImage
                                                        src={org.image ?? ""}
                                                        alt={org.name}
                                                    />
                                                    <AvatarFallback>
                                                        {org.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {org.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        currentOrg.id === org.id
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                            </CommandItem>
                                        ))
                                    ) : (
                                        <p className="px-2 text-xs font-light text-muted-foreground">
                                            No organization found.
                                        </p>
                                    )}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <CommandItem>
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="flex w-full cursor-pointer items-center justify-start gap-2"
                                    >
                                        <PlusCircledIcon className="h-4 w-4" />
                                        <span className="font-medium">
                                            Create Organization
                                        </span>
                                    </button>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </Fragment>
    );
}
