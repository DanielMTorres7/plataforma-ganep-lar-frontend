'use client';

import { useState, useEffect } from 'react';
import '@/app/components/css/table.css';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, SortingState, ColumnFiltersState } from "@tanstack/react-table";
import InfoCellCompoent from '../../../components/InfoCellCompoent';

interface ProdutosConvenio {
    operadora: string; 
    produto: string; 
    diario: Diario[]; 
    media: number;
}
interface Diario{
    dia: string;
    total: number;
    entradas?: string[];
    saidas?: string[];
}

interface ProdutosConvenioTableProps {
    tableData: ProdutosConvenio[];
}

export default function ProdutosConvenioTable({tableData}: ProdutosConvenioTableProps) {    
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    // Definir as colunas da tabela
    const columns: ColumnDef<any>[] = [
        {
            header: 'Operadora',
            accessorKey: 'operadora',
            enableSorting: true,
        },
        {
            header: 'Produto',
            accessorKey: 'produto',
            enableSorting: true,
        },
        ...Array.from({ length: 31 }, (_, i) => ({
            header: `${i + 1}`,
            accessorKey: `${i + 1}`,
            enableSorting: true,
        })),
        {
            header: 'Média',
            accessorKey: 'media',
            enableSorting: true,
        },
    ];
    
    const table = useReactTable({
        data: tableData,
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
        <table className='custom-table'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell, cellIndex) => {

                                if (cell.column.columnDef.header && 
                                    cell.column.columnDef.header === 'Operadora' || 
                                    cell.column.columnDef.header === 'Produto' ||
                                    cell.column.columnDef.header === 'Média'
                                ) {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                }
                                
                                const prevCellValue = row.getVisibleCells()[cellIndex - 1].getValue() && ((row.getVisibleCells()[cellIndex - 1].getValue()) as Diario).total;
                                const currentCellValue = (cell.getValue() as Diario);
                                if (!(currentCellValue && currentCellValue.total)) {
                                    return (
                                        <td key={cell.id}></td>
                                    );
                                }
                                const currentTotal = currentCellValue && currentCellValue.total;
                                let className = '';

                                if (typeof currentTotal === 'number' && typeof prevCellValue === 'number') {
                                    if (currentTotal > prevCellValue) {
                                        className = 'greater';
                                        return (
                                            <td key={cell.id} className={className}>
                                                <InfoCellCompoent
                                                    value={currentCellValue.total.toString()}
                                                    entradas={currentCellValue.entradas}
                                                    saidas={currentCellValue.saidas}
                                                />
                                            </td>
                                        );
                                    } else if (currentTotal < prevCellValue) {
                                        className = 'lesser';
                                        return (
                                            <td key={cell.id} className={className}>
                                                <InfoCellCompoent
                                                    value={currentCellValue.total.toString()}
                                                    entradas={currentCellValue.entradas}
                                                    saidas={currentCellValue.saidas}
                                                />
                                            </td>
                                        );
                                    }
                                    
                                }
                                return (
                                    <td key={cell.id} className={className}>
                                        {currentCellValue.total}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
    );
}