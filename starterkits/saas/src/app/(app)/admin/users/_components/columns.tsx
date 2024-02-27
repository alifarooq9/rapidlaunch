/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type users } from "@/server/db/schema";
import { Badge } from "@/components/ui/badge";
import { ColumnDropdown } from "@/app/(app)/admin/users/_components/data-table-column-dropdown";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersData = {
    id: string;
    name: string | null;
    email: string;
    role: typeof users.$inferSelect.role;
    status: "verified" | "unverified";
    createdAt: Date;
};

export const columns: ColumnDef<UsersData>[] = [
    {
        accessorKey: "idx",
        header: () => <span className="px-1">IDX</span>,
        cell: ({ row }) => (
            <span className="px-2 text-center">{row.index + 1}</span>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            if (row.original.name) {
                return <span className="font-medium">{row.original.name}</span>;
            }

            return <span className="text-muted-foreground">No name</span>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <Badge variant="secondary" className="capitalize">
                {row.original.role}
            </Badge>
        ),
        filterFn: (row, id, value) => {
            return !!value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.status === "verified" ? "success" : "info"
                }
                className="capitalize"
            >
                {row.original.status}
            </Badge>
        ),
        filterFn: (row, id, value) => {
            return !!value.includes(row.getValue(id));
        },
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
