"use client"
import Link from 'next/link'
import React, { Fragment } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
    type VisibilityState,
} from '@tanstack/react-table'

interface TableHeader {
    key: string;
    label: string;
    className?: string;
}

interface TableAction {
    icon: string;
    className: string;
    onClick?: () => void;
    href?: string;
}

interface TableRow {
    [key: string]: any;
    actions?: TableAction[];
}

interface DataTableProps {
    headers: TableHeader[];
    data: TableRow[];
    className?: string;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    meta?: {
        className?: string;
    };
};

const GlobalFilter = ({ filter, setFilter }: { filter: string; setFilter: (value: string) => void }) => {
    return (
        <span className="ms-auto">
            <input
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value)}
                className="form-control !w-auto"
                placeholder="Search..."
            />
        </span>
    );
};

const DataTable: React.FC<DataTableProps> = ({ headers, data, className = '' }) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [globalFilter, setGlobalFilter] = React.useState('')

    const columnHelper = createColumnHelper<TableRow>()

    const columns = React.useMemo(() => 
        headers.map(header => 
            columnHelper.accessor(header.key, {
                header: header.label,
                cell: info => info.getValue(),
                meta: {
                    className: header.className || '',
                },
            })
        ), [headers]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="mb-4 flex">
                <select
                    className="selectpage border me-1"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 25, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="table-responsive">
                <table className={`table whitespace-nowrap min-w-full ${className}`}>
                    <thead className="bg-primary/10">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="border-b border-primary/10">
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className={`text-start ${(header.column.columnDef as CustomColumnDef<TableRow, any>).meta?.className || ''}`}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <Fragment>
                                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                            <span>
                                                {{
                                                    asc: <i className="ri-arrow-up-s-line ms-1"></i>,
                                                    desc: <i className="ri-arrow-down-s-line ms-1"></i>,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </span>
                                        </Fragment>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b border-primary/10">
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className={`text-start ${(cell.column.columnDef as CustomColumnDef<TableRow, any>).meta?.className || ''}`}
                                    >
                                        {cell.column.id === 'actions' && row.original.actions ? (
                                            <div className="hstack flex gap-3 text-[.9375rem]">
                                                {row.original.actions.map((action: TableAction, actionIndex: number) => (
                                                    action.href ? (
                                                        <Link
                                                            key={actionIndex}
                                                            aria-label="anchor"
                                                            href={action.href}
                                                            className={`ti-btn ti-btn-sm ${action.className} !rounded-full`}
                                                            onClick={action.onClick}
                                                        >
                                                            <i className={action.icon}></i>
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            key={actionIndex}
                                                            className={`ti-btn ti-btn-sm ${action.className} !rounded-full`}
                                                            onClick={action.onClick}
                                                        >
                                                            <i className={action.icon}></i>
                                                        </button>
                                                    )
                                                ))}
                                            </div>
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="block sm:flex items-center mt-4">
                <div className="">
                    Page{" "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>{" "}
                </div>
                <div className="sm:ms-auto float-right my-1 sm:my-0">
                    <button
                        className="ti-btn ti-btn-light me-2 mb-2 sm:mb-0 sm:inline block"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {" Previous "}
                    </button>
                    <button
                        className="ti-btn ti-btn-light me-2 mb-2 sm:mb-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {" << "}
                    </button>
                    <button
                        className="ti-btn ti-btn-light me-2 mb-2 sm:mb-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {" < "}
                    </button>
                    <button
                        className="ti-btn ti-btn-light me-2 mb-2 sm:mb-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {" > "}
                    </button>
                    <button
                        className="ti-btn ti-btn-light me-2 mb-2 sm:mb-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {" >> "}
                    </button>
                    <button
                        className="ti-btn ti-btn-light sm:inline block"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {" Next "}
                    </button>
                </div>
            </div>
        </>
    );
}

export default DataTable 