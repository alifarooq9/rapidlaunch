/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ColumnDropdown } from "./column-dropdown";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WaitlistData = {
    id: string;
    name: string | null;
    email: string;
    createdAt: Date;
};

export function getColumns(): ColumnDef<WaitlistData>[] {
    return columns;
}

export const columns: ColumnDef<WaitlistData>[] = [
    {
        accessorKey: "name",
        header: () => <span className="pl-2">Name</span>,
        cell: ({ row }) => {
            if (row.original.name) {
                return (
                    <span className="pl-2 font-medium">
                        {row.original.name}
                    </span>
                );
            }

            return <span className="px-2 text-muted-foreground">No name</span>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="w-full flex-grow">{row.original.email}</span>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {format(new Date(row.original.createdAt), "PP")}
            </span>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <ColumnDropdown {...row.original} />,
    },
];
