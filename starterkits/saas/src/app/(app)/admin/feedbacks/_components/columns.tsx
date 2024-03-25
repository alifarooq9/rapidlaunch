/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ColumnDropdown } from "@/app/(app)/admin/feedbacks/_components/column-dropdown";
import { FeedbackDetails } from "@/app/(app)/admin/feedbacks/_components/feedback-details";
import { format } from "date-fns";
import type { getAllPaginatedFeedbacksQuery } from "@/server/actions/feedback/queries";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type FeedbackData = Awaited<
    ReturnType<typeof getAllPaginatedFeedbacksQuery>
>["data"][number];

export function getColumns(): ColumnDef<FeedbackData>[] {
    return columns;
}

export const columns: ColumnDef<FeedbackData>[] = [
    {
        accessorKey: "idx",
        header: () => <span className="px-1">IDX</span>,
        cell: ({ row }) => (
            <span className="px-2 text-center">{row.index + 1}</span>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <FeedbackDetails {...row.original} />,
    },
    {
        accessorKey: "email",
        header: "User Email",
        cell: ({ row }) => {
            return row.original.user.email;
        },
    },
    {
        accessorKey: "label",
        header: "Label",
        cell: ({ row }) => (
            <Badge variant="secondary" className="capitalize">
                {row.original.label}
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
                    row.original.status === "Open"
                        ? "success"
                        : row.original.status === "In Progress"
                          ? "info"
                          : "secondary"
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
