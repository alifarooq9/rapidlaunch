"use client";

import { DataTable } from "@/app/(app)/_components/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns, type WaitlistData } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableSearchableColumn } from "@/types/data-table";
import { type getPaginatedWaitlistQuery } from "@/server/actions/waitlist/query";

/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */

type WaitlistTableProps = {
    waitlistPromise: ReturnType<typeof getPaginatedWaitlistQuery>;
};

const searchableColumns: DataTableSearchableColumn<WaitlistData>[] = [
    { id: "email", placeholder: "Search email..." },
];

export function WaitlistTable({ waitlistPromise }: WaitlistTableProps) {
    const { data, pageCount, total } = React.use(waitlistPromise);

    const columns = useMemo<ColumnDef<WaitlistData, unknown>[]>(
        () => getColumns(),
        [],
    );

    const waitlistData: WaitlistData[] = data.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    });

    const { table } = useDataTable({
        data: waitlistData,
        columns,
        pageCount,
        searchableColumns,
    });

    return (
        <DataTable
            table={table}
            columns={columns}
            searchableColumns={searchableColumns}
            totalRows={total}
        />
    );
}
