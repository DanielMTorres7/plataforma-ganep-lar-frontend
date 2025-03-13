'use client';

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import '@/app/components/css/table.css';
import { atendimento } from "../../interfaces";


interface atendimentos {
    atendimentos: atendimento[];
}

export default function DispositivosTableComponent({ atendimentos }: atendimentos) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns: ColumnDef<atendimento>[] = [
            {
                header: 'Prontuário',
                accessorKey: 'PRONTUARIO',
                cell: info => <span>{info.getValue() as number}</span>,
            },
            {
                header: 'Atendimento',
                accessorKey: 'ATENDIMENTO',
                cell: info => <span>{info.getValue() as number}</span>,
            },
            {
                header: 'Paciente',
                accessorKey: 'PACIENTE',
                cell: info => <span>{info.getValue() as string}</span>,
            },
            {
                header: 'Operadora',
                accessorKey: 'OPERADORA',
                cell: info => <span>{info.getValue() as string}</span>,
            },
            {
                header: 'Entrada',
                accessorKey: 'ENTRADA',
                cell: info => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
                sortingFn: (a, b) => {
                    return new Date(a.original.ENTRADA).getTime() - new Date(b.original.ENTRADA).getTime();
                },
            },
            {
                header: 'Status',
                accessorKey: 'STATUS',
                cell: info => <span>{info.getValue() as string}</span>,
            },
            {
                header: 'Data Alta',
                accessorKey: 'ALTA',
                cell: info => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
                sortingFn: (a, b) => {
                    return new Date(a.original.ALTA).getTime() - new Date(b.original.ALTA).getTime();
                },
            },
            {
                header: 'CVA',
                accessorKey: 'CVA',
                cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
            },
            {
                header: 'CVD',
                accessorKey: 'CVD',
                cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
            },
            {
                header: 'GTT',
                accessorKey: 'GTT',
                cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
            },
            {
                header: 'SNE',
                accessorKey: 'SNE',
                cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
            },
            {
                header: 'TQT',
                accessorKey: 'TQT',
                cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
            },
            {
                header: 'PICC',
                accessorKey: 'PICC',
                cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
            },
            
        ];
        const table = useReactTable({
            data: atendimentos,
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
    
    if (table.getRowModel().rows.length === 0) {
        return <div>Nenhum dado encontrado</div>;
    }

    return (
        <>
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
                                <td key={cell.id} className='td_cell' style={{ backgroundColor: typeof cell.getValue() === 'boolean' && cell.getValue() ? 'lightgreen' : 'white' }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}