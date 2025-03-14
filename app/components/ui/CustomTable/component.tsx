import { useState } from "react";
import { ColumnFiltersState, SortingState, ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import './styles.css';

interface CustomTableProps {
    columns: ColumnDef<any, any>[]; // ColumnDefResolved<any, any>[];
    data: any[];
    className?: string;
    style?: React.CSSProperties;
}

export default function CustomTableComponent({ data, columns, className, style }: CustomTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className={'table_holder ' + className} style={style}>
            <table className='custom-table'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} className='th_header'>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={
                                            header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : ''
                                            }
                                            onClick={header.column.getToggleSortingHandler()}
                                            title={
                                            header.column.getCanSort()
                                                ? header.column.getNextSortingOrder() === 'asc'
                                                ? 'Sort ascending'
                                                : header.column.getNextSortingOrder() === 'desc'
                                                    ? 'Sort descending'
                                                    : 'Clear sort'
                                                : undefined
                                            }
                                        >
                                            {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                            )}
                                            {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                        )}
                                    
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={`td_cell td-${typeof cell.getValue()}`} style={{ backgroundColor: typeof cell.getValue() === 'boolean' && cell.getValue() ? 'lightgreen' : 'white' }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}