'use client'; // Indica que este é um Client Component

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState, useEffect } from 'react';
import { DadosAtendimento } from '../../../types/types';
import './styles.css';
import '@/app/components/css/table.css';
import useFetchData from '@/app/hooks/useFetchData';

interface resposta {
    origem: string;
    especialidade: string;
    custo_total: number;
    agendar_de: string;
    agendar_ate: string;
    profissional: string;
    conselho: string;
    empresa: string;
    qtde: number;
    base: number;
    bonus: number;
    tx_adm: number;
    inss: number;
    fgts: number;
    provisoes: number;
    transporte: number;
    beneficios: number;
    editado: string;
    cobrar: number;
    pagar: number;
    plantao: number;
    realizado: number;
    manual: number;
}

interface DadosModProps {
    isOpen: boolean; // Controla se o modal está aberto
    onClose: () => void; // Função para fechar o modal
    dadosAtendimento: DadosAtendimento; // Dados necessários para a requisição
}

export default function DadosMod({ isOpen, onClose, dadosAtendimento }: DadosModProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const { data: infos, loading } = useFetchData<Array<resposta>>({
        endpoint: 'detalhesmod',
        body: { 
            mes: dadosAtendimento.mes,
            atendimento: dadosAtendimento.atendimento,
        }, // Só envia o body se dadosAtendimento existir
    });

    const columns: ColumnDef<resposta>[] = [
        {
            header: 'Origem',
            accessorKey: 'origem',
            cell: info => <span>{info.getValue() as string}</span>,
        },
        {
            header: 'Especialidade',
            accessorKey: 'especialidade',
            cell: info => <span>{info.getValue() as string}</span>,
        },
        {
            header: 'Custo Total',
            accessorKey: 'custo_total',
            cell: info => <span>{info.getValue() as number}</span>,
        },
        {
            header: 'Agendar De',
            accessorKey: 'agendar_de',
            cell: info => <span>{info.getValue() as string}</span>,
        },
        {
            header: 'Agendar Até',
            accessorKey: 'agendar_ate',
            cell: info => <span>{info.getValue() as string}</span>,
        },
        {
            header: 'Profissional',
            accessorKey: 'profissional',
            cell: info => <span>{info.getValue() as string}</span>,
        },
        {
            header: 'Conselho',
            accessorKey: 'conselho',
            cell: info => <span>{info.getValue() as string}</span>,
        },
        {
            header: 'Empresa',
            accessorKey: 'empresa',
            cell: info => <span>{info.getValue() as string}</span>,
        },
        {
            header: 'Qtde',
            accessorKey: 'qtde',
            cell: info => <span>{info.getValue() as number}</span>,
        },
        {
            header: 'Base',
            accessorKey: 'base',
            cell: info => <span>{info.getValue() as number}</span>,
        },
        {
            header: 'Bonus',
            accessorKey: 'bonus',
            cell: info => <span>{info.getValue() as number}</span>,
        },
        {
            header: 'TxAdm',
            accessorKey: 'tx_adm',
            cell: info => <span>{info.getValue() as number}</span>,
        },
        {
            header: 'INSS',
            accessorKey: 'inss',
            cell: info => <span>{info.getValue() as number}</span>,
        },
        {
            header: 'FGTS',
            accessorKey: 'fgts',
            cell: info => <span>{info.getValue() as number}</span>,
        },
        {
            header: 'Provisoes',
            accessorKey: 'provisoes',
            cell: info => <span>{info.getValue() as number}</span>,
        },
    ];

    const table = useReactTable({
        data: infos ?? [],
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

    if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">Fechar</button>

                {loading && <p>Carregando...</p>}
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
            </div>
        </div>
    );
}