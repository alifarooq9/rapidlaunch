"use client";

import { DataTable } from "@/app/(app)/_components/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { getColumns, type MembersData } from "./columns";
import { membersToOrganizationsRoleEnum } from "@/server/db/schema";
import { useDataTable } from "@/hooks/use-data-table";
import type {
    DataTableFilterableColumn,
    DataTableSearchableColumn,
} from "@/types/data-table";
import { type getPaginatedOrgMembersQuery } from "@/server/actions/organization/queries";
import { useMutation } from "@tanstack/react-query";
import { removeUserMutation } from "@/server/actions/organization/mutations";

/** @learn more about data-table at shadcn ui website @see https://ui.shadcn.com/docs/components/data-table */

const filterableColumns: DataTableFilterableColumn<MembersData>[] = [
    {
        id: "role",
        title: "Role",
        options: membersToOrganizationsRoleEnum.enumValues.map((v) => ({
            label: v,
            value: v,
        })),
    },
];

type MembersTableProps = {
    membersPromise: ReturnType<typeof getPaginatedOrgMembersQuery>;
};

const searchableColumns: DataTableSearchableColumn<MembersData>[] = [
    { id: "email", placeholder: "Search email..." },
];

export function MembersTable({ membersPromise }: MembersTableProps) {
    const { data, pageCount, total } = React.use(membersPromise);

    const columns = useMemo<ColumnDef<MembersData, unknown>[]>(
        () => getColumns(),
        [],
    );

    const membersData: MembersData[] = data.map((member) => {
        return {
            id: member.id!,
            role: member.role,
            createdAt: member.createdAt,
            email: member.user.email,
            name: member.user.name,
        };
    });

    const { table } = useDataTable({
        data: membersData,
        columns,
        pageCount,
        searchableColumns,
        filterableColumns,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            removeUserMutation({
                memberId: "4a0775c3-4ddf-480e-aa70-689d314ef640",
            }),
    });

    return (
        <>
            <DataTable
                table={table}
                columns={columns}
                filterableColumns={filterableColumns}
                searchableColumns={searchableColumns}
                totalRows={total}
            />
            <button onClick={() => mutate()}>
                {isPending ? "Removing user..." : "Remove user"}
            </button>
        </>
    );
}
