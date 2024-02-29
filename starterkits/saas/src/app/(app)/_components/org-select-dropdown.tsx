"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { orgConfig } from "@/config/organization";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
import { CreateOrgForm } from "@/app/(app)/_components/create-org-form";
import { type organizations } from "@/server/db/schema";
import { revalidateOrganizationsTag } from "@/server/actions/organization";

type OrgSelectDropdownProps = {
    currentOrg: typeof organizations.$inferSelect;
    userOrgs: (typeof organizations.$inferSelect)[];
};

export function OrgSelectDropdown({
    currentOrg,
    userOrgs,
}: OrgSelectDropdownProps) {
    const isCollapsed = false;

    const onOrgChange = async (orgId: string) => {
        document.cookie = `${orgConfig.cookieName}=${orgId};`;
        await revalidateOrganizationsTag();
    };

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <CreateOrgForm open={drawerOpen} setOpen={setDrawerOpen} />

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "flex w-full justify-start gap-2 overflow-hidden p-2",
                        )}
                        aria-label="user dropdown"
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
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60" align="start">
                    <DropdownMenuGroup>
                        {userOrgs.map((org) => (
                            <DropdownMenuItem
                                key={org.id}
                                asChild
                                className={
                                    currentOrg.id === org.id
                                        ? "bg-accent/60"
                                        : ""
                                }
                            >
                                <button
                                    onClick={() => onOrgChange(org.id)}
                                    className="flex w-full cursor-pointer items-center justify-between gap-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage
                                                src={org.image ? org.image : ""}
                                            />

                                            <AvatarFallback className="text-xs">
                                                {org?.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="truncate">
                                            {org?.name}
                                        </span>
                                    </div>

                                    {currentOrg.id === org.id && (
                                        <CheckIcon className="h-4 w-4 text-foreground" />
                                    )}
                                </button>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="flex w-full cursor-pointer items-center justify-start gap-2"
                        >
                            <PlusCircledIcon className="h-4 w-4" />
                            <span className="font-medium">
                                Create Organization
                            </span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Fragment>
    );
}
