/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { type membersToOrganizations } from "@/server/db/schema";
import { ColumnDropdown } from "./column-dropdown";
import { Badge } from "@/components/ui/badge";
import { OrgDetails } from "@/app/(app)/admin/organizations/_components/org-details";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrganizationsData = {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    owner: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
    };
    subscribed: boolean;
    members: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
        role: typeof membersToOrganizations.$inferSelect.role;
    }[];
    createdAt: Date;
};

export function getColumns(): ColumnDef<OrganizationsData>[] {
    return columns;
}

export const columns: ColumnDef<OrganizationsData>[] = [
    {
        accessorKey: "name",
        header: () => <span className="pl-2">Name</span>,
        cell: ({ row }) => <OrgDetails {...row.original} />,
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "owner.email",
        header: "Owner Email",
    },
    {
        accessorKey: "subscribed",
        header: "Subscribed",
        cell: ({ row }) => (
            <Badge variant={row.original.subscribed ? "success" : "info"}>
                {row.original.subscribed ? "Yes" : "No"}
            </Badge>
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
