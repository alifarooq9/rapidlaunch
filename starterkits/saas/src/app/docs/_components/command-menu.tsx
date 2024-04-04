"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-alert-dialog";
import { CircleIcon, LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

export function CommandMenu({ ...props }: DialogProps) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const { setTheme } = useTheme();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                if (
                    (e.target instanceof HTMLElement &&
                        e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative h-9 w-full justify-start rounded-md bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
                )}
                onClick={() => setOpen(true)}
                {...props}
            >
                <span className="hidden lg:inline-flex">
                    Search documentation...
                </span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] hidden select-none items-center gap-1 rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {docsConfig.nav.map((section) => (
                        <CommandGroup key={section.id} heading={section.label}>
                            {section.items.map((item) => {
                                if (item.subItems) {
                                    return (
                                        <CommandGroup
                                            key={item.id}
                                            heading={item.label}
                                        >
                                            {item.subItems.map((subItem) => (
                                                <CommandItem
                                                    className="h-9"
                                                    key={subItem.id}
                                                    value={subItem.label}
                                                    disabled={subItem.disabled}
                                                    onSelect={() => {
                                                        runCommand(() =>
                                                            router.push(
                                                                subItem.href,
                                                            ),
                                                        );
                                                    }}
                                                >
                                                    <CircleIcon className="mr-2 h-4 w-4" />
                                                    {subItem.label}
                                                    {subItem.badge && (
                                                        <Badge variant="secondary">
                                                            {subItem.badge}
                                                        </Badge>
                                                    )}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    );
                                } else {
                                    return (
                                        <CommandItem
                                            className="h-9"
                                            key={item.id}
                                            value={item.label}
                                            disabled={item.disabled}
                                            onSelect={() => {
                                                runCommand(() =>
                                                    router.push(item.href),
                                                );
                                            }}
                                        >
                                            <CircleIcon className="mr-2 h-4 w-4" />
                                            {item.label}
                                            {item.badge && (
                                                <Badge variant="secondary">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </CommandItem>
                                    );
                                }
                            })}
                        </CommandGroup>
                    ))}

                    <CommandSeparator />
                    <CommandGroup heading="Theme">
                        <CommandItem
                            onSelect={() => runCommand(() => setTheme("light"))}
                            className="h-9"
                        >
                            <SunIcon className="mr-2 h-4 w-4" />
                            Light
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => setTheme("dark"))}
                            className="h-9"
                        >
                            <MoonIcon className="mr-2 h-4 w-4" />
                            Dark
                        </CommandItem>
                        <CommandItem
                            onSelect={() =>
                                runCommand(() => setTheme("system"))
                            }
                            className="h-9"
                        >
                            <LaptopIcon className="mr-2 h-4 w-4" />
                            System
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
