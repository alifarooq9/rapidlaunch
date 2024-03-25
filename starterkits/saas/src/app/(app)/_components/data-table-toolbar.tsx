"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/(app)/_components/data-table-view-options";

import { DataTableFacetedFilter } from "@/app/(app)/_components/data-table-faceted-filter";
import type {
    DataTableFilterableColumn,
    DataTableSearchableColumn,
} from "@/types/data-table";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    filterableColumns?: DataTableFilterableColumn<TData>[];
    searchableColumns?: DataTableSearchableColumn<TData>[];
}

export function DataTableToolbar<TData>({
    table,
    filterableColumns = [],
    searchableColumns = [],
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {searchableColumns.length > 0 &&
                    searchableColumns.map(
                        (column) =>
                            table.getColumn(
                                column.id ? String(column.id) : "",
                            ) && (
                                <Input
                                    key={String(column.id)}
                                    placeholder={column.placeholder}
                                    value={
                                        (table
                                            .getColumn(String(column.id))
                                            ?.getFilterValue() as string) ?? ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn(String(column.id))
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="h-8 w-[150px] bg-background lg:w-[250px]"
                                />
                            ),
                    )}

                {filterableColumns.length > 0 &&
                    filterableColumns.map(
                        (column) =>
                            table.getColumn(
                                column.id ? String(column.id) : "",
                            ) && (
                                <DataTableFacetedFilter
                                    key={String(column.id)}
                                    column={table.getColumn(
                                        column.id ? String(column.id) : "",
                                    )}
                                    title={column.title}
                                    options={column.options}
                                />
                            ),
                    )}
                {isFiltered && (
                    <Button
                        aria-label="Reset filters"
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
                {/* {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={
                            statuses as unknown as {
                                label: string;
                                value: string;
                            }[]
                        }
                    />
                )}
                {table.getColumn("role") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("role")}
                        title="Roles"
                        options={roles}
                    />
                )} */}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
