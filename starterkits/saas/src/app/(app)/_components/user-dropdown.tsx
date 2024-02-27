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
import { siteUrls } from "@/config/urls";
import {
    type UserDropdownNavItems,
    userDropdownConfig,
} from "@/config/user-dropdown";
import { cn } from "@/lib/utils";
import { usersRoleEnum } from "@/server/db/schema";
import { LogOutIcon } from "lucide-react";
import { type User } from "next-auth";
import Link from "next/link";
import { Fragment } from "react";
import { z } from "zod";
import { SignoutTrigger } from "@/components/signout-trigger";

/**
 * to @add more navigation items to the user dropdown, you can add more items to the `userDropdownConfig` object in the
 * @see /src/config/user-dropdown.ts file
 */

type UserDropdownProps = {
    user: User | null;
};

const userRoles = z.enum(usersRoleEnum.enumValues);

export async function UserDropdown({ user }: UserDropdownProps) {
    const navItems =
        user?.role === userRoles.Values.Admin ||
        user?.role === userRoles.Values["Super Admin"]
            ? userDropdownConfig.navigation
            : userDropdownConfig.filterNavItems({
                  removeIds: [userDropdownConfig.navIds.admin],
              });

    return <UserDropdownContent user={user} navItems={navItems} />;
}

type UserDropdownContentProps = {
    user: User | null;
    navItems: UserDropdownNavItems[];
};

function UserDropdownContent({ user, navItems }: UserDropdownContentProps) {
    const isCollapsed = false;

    return (
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
                        <AvatarImage src={user!.image ?? ""} />

                        <AvatarFallback className="text-xs">
                            {user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {!isCollapsed && (
                        <span className="truncate">{user?.email}</span>
                    )}

                    <span className="sr-only">user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="start">
                <DropdownMenuLabel className="flex w-56 flex-col items-start gap-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user!.image ?? ""} />
                        <AvatarFallback>
                            {user?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex w-full flex-col">
                        <p className="truncate text-sm">
                            {user?.name ?? "Name not found"}
                        </p>
                        <p className="w-full truncate text-sm font-light text-muted-foreground">
                            {user?.email}
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
                        <DropdownMenuLabel>{nav.label}</DropdownMenuLabel>
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
                <SignoutTrigger callbackUrl={siteUrls.home} asChild>
                    <DropdownMenuItem asChild>
                        <button className="flex w-full cursor-pointer items-center gap-2 text-red-500 ">
                            <LogOutIcon className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </DropdownMenuItem>
                </SignoutTrigger>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
