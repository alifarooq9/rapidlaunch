"use client";

import { DataTable } from "@/app/(app)/_components/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns, type OrganizationsData } from "./columns";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableSearchableColumn } from "@/types/data-table";
import { type getPaginatedOrgsQuery } from "@/server/actions/organization/queries";

/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */

type OrgsTableProps = {
    orgsPromise: ReturnType<typeof getPaginatedOrgsQuery>;
};

const searchableColumns: DataTableSearchableColumn<OrganizationsData>[] = [
    { id: "email", placeholder: "Search email..." },
];

export function OrgsTable({ orgsPromise }: OrgsTableProps) {
    const { data, pageCount, total } = React.use(orgsPromise);

    const columns = useMemo<ColumnDef<OrganizationsData, unknown>[]>(
        () => getColumns(),
        [],
    );

    const organizationsData: OrganizationsData[] = data.map((org) => {
        const members = org.members.map((mto) => {
            return {
                id: mto.id,
                name: mto.name,
                email: mto.email,
                image: mto.image,
                role: mto.role,
            };
        });

        return {
            id: org.id,
            name: org.name,
            email: org.email,
            createdAt: org.createdAt,
            image: org.image,
            members: members,
            owner: {
                id: org.ownerId,
                name: org.owner.name,
                email: org.owner.email,
                image: org.owner.image,
            },
            subscribed: org.subscriptions?.id ? true : false,
        };
    });

    const { table } = useDataTable({
        data: organizationsData,
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
