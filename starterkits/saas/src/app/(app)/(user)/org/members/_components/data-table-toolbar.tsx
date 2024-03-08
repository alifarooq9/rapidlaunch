"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/(app)/_components/data-table-view-options";
import { DataTableFacetedFilter } from "@/app/(app)/_components/data-table-faceted-filter";
import { membersToOrganizationsRoleEnum } from "@/server/db/schema";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    const roles = membersToOrganizationsRoleEnum.enumValues.map((role) => ({
        label: role,
        value: role,
    }));

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search email..."
                    value={
                        (table
                            .getColumn("email")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("email")
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] bg-background lg:w-[250px]"
                />
                {table.getColumn("role") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("role")}
                        title="Roles"
                        options={roles}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
