"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThemeToggleProps {
    button: React.ReactNode;
}

export function ThemeToggle({ button }: ThemeToggleProps) {
    const { setTheme, theme, themes } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map((t) => (
                    <DropdownMenuCheckboxItem
                        key={t}
                        checked={theme === t}
                        onClick={() => setTheme(t)}
                        className="text-sm capitalize"
                    >
                        {t}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
