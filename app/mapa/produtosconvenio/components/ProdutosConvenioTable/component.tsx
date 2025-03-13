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
interface table {
    operadora: string;
    produto: string;
    media: number;
}

export default function ProdutosConvenioTable({tableData}: ProdutosConvenioTableProps) {    
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    console.log(tableData);
    
    const dias = tableData[0] && Object.keys(tableData[0]).filter(key => !['operadora', 'produto', 'media'].includes(key)) || [];

    // Definir as colunas da tabela
    const columns: ColumnDef<table>[] = [
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
        ...Array.from({ length: dias.length }, (_, i) => ({
            header: `${dias[i]}`,
            accessorKey: `${dias[i]}`,
            enableSorting: true,
            sortingFn: (a:any, b:any) => {
                const a_diario = a.original[`${dias[i]}`] || {
                    total: 0,
                };
                const b_diario = b.original[`${dias[i]}`] || {
                    total: 0,
                };
                console.log(a_diario, b_diario);
                return a_diario.total - b_diario.total;
            }
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
                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: ' 🔼',
                                    desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell, cellIndex) => {
                            // se a coluna for de texto deve alinhar a esquerda
                            const textAlign = cell.column.columnDef.header === 'Operadora' || cell.column.columnDef.header === 'Produto' ? 'left' : 'center';


                            if (cell.column.columnDef.header && 
                                cell.column.columnDef.header === 'Operadora' || 
                                cell.column.columnDef.header === 'Produto' ||
                                cell.column.columnDef.header === 'Média'
                            ) {
                                return (
                                    <td key={cell.id} style={{textAlign: textAlign}}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                            }
                            
                            const prevCellValue = row.getVisibleCells()[cellIndex - 1].getValue() && ((row.getVisibleCells()[cellIndex - 1].getValue()) as Diario).total;
                            const currentCellValue = (cell.getValue() as Diario);
                            if (!(currentCellValue && currentCellValue.total)) {
                                return (
                                    <td key={cell.id} style={{textAlign: textAlign}}></td>
                                );
                            }
                            const currentTotal = currentCellValue && currentCellValue.total;
                            let className = '';

                            if (typeof currentTotal === 'number' && typeof prevCellValue === 'number') {
                                if (currentTotal > prevCellValue) {
                                    className = 'greater';
                                    return (
                                        <InfoCellCompoent
                                            value={currentCellValue.total.toString()}
                                            entradas={currentCellValue.entradas}
                                            saidas={currentCellValue.saidas}
                                            className={className}
                                        />
                                    );
                                } else if (currentTotal < prevCellValue) {
                                    className = 'lesser';
                                    return (
                                        <InfoCellCompoent
                                            value={currentCellValue.total.toString()}
                                            entradas={currentCellValue.entradas}
                                            saidas={currentCellValue.saidas}
                                            className={className}
                                        />
                                    );
                                }
                                
                            }
                            return (
                                <td key={cell.id} className={className} style={{textAlign: textAlign}}>
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