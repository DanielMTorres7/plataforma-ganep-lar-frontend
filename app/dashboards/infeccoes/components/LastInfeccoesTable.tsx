'use client';

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import '@/app/components/css/table.css';

interface TableLastInfeccoesData {
    NOME_PACIENTE: string;
    DATA_OCORRENCIA: string;
    TIPO_INFECCAO: string;
    OPERADORA: string;
}

interface LastInfeccoesComponentProps {
    pacientes: TableLastInfeccoesData[];
}

export default function LastInfeccoesComponent({ pacientes }: LastInfeccoesComponentProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns: ColumnDef<TableLastInfeccoesData>[] = [
            {
                header: 'Paciente',
                accessorKey: 'NOME_PACIENTE',
                cell: info => <span>{info.getValue() as string}</span>,
            },
            {
                header: 'Data Ocorrência',
                accessorKey: 'DATA_OCORRENCIA',
                cell: info => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
                sortingFn: (a, b) => {
                    return new Date(a.original.DATA_OCORRENCIA).getTime() - new Date(b.original.DATA_OCORRENCIA).getTime();
                },
            },
            {
                header: 'Tipo de Infecção',
                accessorKey: 'TIPO_INFECCAO',
                cell: info => <span>{info.getValue() as string}</span>,
            },
            {
                header: 'Operadora',
                accessorKey: 'OPERADORA',
                cell: info => <span>{info.getValue() as string}</span>,
            },
        ];
        const table = useReactTable({
            data: pacientes,
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
                                <td key={cell.id} className='td_cell'>
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