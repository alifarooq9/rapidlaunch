"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { siteUrls } from "@/config/urls";
import {
    type UserDropdownNavItems,
    userDropdownConfig,
} from "@/config/user-dropdown";
import { cn } from "@/lib/utils";
import { usersRoleEnum } from "@/server/db/schema";
import { LogOutIcon } from "lucide-react";
import { type Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { z } from "zod";

/**
 * to @add more navigation items to the user dropdown, you can add more items to the `userDropdownConfig` object in the
 * @see /src/config/user-dropdown.ts file
 */

type UserDropdownProps = {
    isCollapsed?: boolean;
};

const userRoles = z.enum(usersRoleEnum.enumValues);

export function UserDropdown({ isCollapsed }: UserDropdownProps) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Button variant="outline" disabled className="w-full">
                <Icons.loader className="h-5 w-5" />
            </Button>
        );
    }

    const navItems =
        session?.user?.role === userRoles.Values.ADMIN ||
        session?.user?.role === userRoles.Values.SUPER_ADMIN
            ? userDropdownConfig.navigation
            : userDropdownConfig.filterNavItems({
                  removeIds: [userDropdownConfig.navIds.admin],
              });

    return (
        <UserDropdownContent
            session={session}
            isCollapsed={isCollapsed}
            navItems={navItems}
        />
    );
}

type UserDropdownContentProps = {
    session: Session | null;
    isCollapsed?: boolean;
    navItems: UserDropdownNavItems[];
};

function UserDropdownContent({
    session,
    isCollapsed,
    navItems,
}: UserDropdownContentProps) {
    return (
        <DropdownMenu modal>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "flex w-full gap-2 overflow-hidden p-2",
                        isCollapsed ? "justify-center" : "justify-start",
                    )}
                    aria-label="user dropdown"
                >
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={session?.user!.image ?? ""} />

                        <AvatarFallback className="text-xs">
                            {session?.user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <span className="truncate">{session?.user?.email}</span>
                    )}

                    <span className="sr-only">user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel className="flex w-56 flex-col items-start gap-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={session?.user!.image ?? ""} />
                        <AvatarFallback>
                            {session?.user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex w-full flex-col">
                        <p className="truncate text-sm">
                            {session?.user?.name ?? "Name not found"}
                        </p>
                        <p className="w-full truncate text-sm font-light text-muted-foreground">
                            {session?.user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/**
                 * to @add more navigation items to the user dropdown, you can add more items to the `userDropdownConfig` object in the
                 * @see /src/config/user-dropdown.ts file
                 */}
                {navItems.map((nav) => (
                    <Fragment key={nav.id}>
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            {nav.label}
                        </DropdownMenuLabel>
                        {nav.items.map((item) => (
                            <DropdownMenuItem key={item.label} asChild>
                                <Link
                                    href={item.href}
                                    className="flex w-full cursor-pointer items-center gap-2"
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                    </Fragment>
                ))}

                <DropdownMenuItem asChild>
                    <button
                        onClick={async () =>
                            await signOut({ callbackUrl: siteUrls.home })
                        }
                        className="flex w-full cursor-pointer items-center gap-2 text-red-500 "
                    >
                        <LogOutIcon className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
