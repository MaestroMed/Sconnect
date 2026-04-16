"use client";

import { useMemo, useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchColumn?: string;
  emptyMessage?: string;
  toolbar?: React.ReactNode;
  pageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Rechercher…",
  searchColumn,
  emptyMessage = "Aucun résultat.",
  toolbar,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize },
    },
    globalFilterFn: searchColumn
      ? (row, _columnId, filterValue) => {
          const cell = row.getValue(searchColumn);
          return String(cell ?? "").toLowerCase().includes(String(filterValue).toLowerCase());
        }
      : "includesString",
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const totalRows = useMemo(() => table.getFilteredRowModel().rows.length, [table, globalFilter, sorting, data]);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-sm min-w-[220px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-border bg-surface-elevated pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {toolbar}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted border-b border-border">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sorted = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className={cn(
                          "px-4 py-3 text-left font-semibold text-foreground",
                          canSort && "cursor-pointer select-none",
                        )}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      >
                        <div className="flex items-center gap-1.5">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort &&
                            (sorted === "asc" ? (
                              <ChevronUp className="h-3.5 w-3.5 text-primary-600 dark:text-primary-300" />
                            ) : sorted === "desc" ? (
                              <ChevronDown className="h-3.5 w-3.5 text-primary-600 dark:text-primary-300" />
                            ) : (
                              <ChevronsUpDown className="h-3.5 w-3.5 text-foreground-muted/60" />
                            ))}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={table.getAllLeafColumns().length}
                    className="px-4 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-foreground-muted">
                      <Inbox className="h-8 w-8 opacity-40" />
                      <span>{emptyMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-b-0 hover:bg-surface-muted/60 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-foreground">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-foreground-muted">
          <span>
            {totalRows} résultat{totalRows > 1 ? "s" : ""} · page {pageIndex + 1} / {pageCount}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-foreground hover:bg-surface-muted disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-foreground hover:bg-surface-muted disabled:opacity-40 disabled:pointer-events-none"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
