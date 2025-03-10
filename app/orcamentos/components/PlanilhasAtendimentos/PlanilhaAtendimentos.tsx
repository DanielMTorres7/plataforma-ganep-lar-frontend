'use client'; // Indica que este é um Client Component

import { useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, ColumnDef, flexRender, SortingState, ColumnFiltersState } from '@tanstack/react-table';
import { DadosAtendimento, PlanilhaAtendimentos } from '../../../types/types';
import DadosMod from '../ModalInfos/ModalInfos';
import '@/app/components/css/table.css';

interface OrcamentosComponentProps {
  Atendimentos: Array<PlanilhaAtendimentos>;
}

export default function PlanilhaAtendimentosComponent({ Atendimentos }: OrcamentosComponentProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAtendimento, setSelectedAtendimento] = useState<DadosAtendimento | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const handleOpenModal = (atendimento: DadosAtendimento) => {
        setSelectedAtendimento(atendimento);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAtendimento(null);
    };

    const columns: ColumnDef<PlanilhaAtendimentos>[] = [
        {
            header: 'Dados do Atendimento',
            columns: [
                {
                    header: 'Atd.',
                    accessorKey: 'atendimento.atendimento',
                },
                {
                    header: 'Paciente',
                    accessorKey: 'atendimento.paciente',
                    cell: info => <span className='td_nome'>{info.getValue() as string}</span>,
                },
                {
                    header: 'Admissão',
                    accessorKey: 'atendimento.admissao',
                },
                {
                    header: 'Alta',
                    accessorKey: 'atendimento.alta',
                },
            ]
        },
        {
            header: 'Totais',
            columns: [
                {
                    header: 'Não Orçado',
                    accessorKey: 'totais.nao_orcado',
                },
                {
                    header: 'Não Programado',
                    accessorKey: 'totais.nao_programado',
                },
                {
                    header: 'Total Orçado',
                    accessorKey: 'totais.total_orcado',
                },
                {
                    header: 'Custo Total',
                    accessorKey: 'totais.custo_total',
                },
                {
                    header: 'M.C.',
                    accessorKey: 'totais.margem_contribuicao',
                },
            ],
        },
        {
            header: 'Diárias e Pacotes',
            columns: [
                {
                    header: 'Orçado Diárias',
                    accessorKey: 'diarias_pacotes.orcado_diarias',
                },
                {
                    header: 'Custo Diárias',
                    accessorKey: 'diarias_pacotes.custo_diarias',
                },
                {
                    header: 'M.C.',
                    accessorKey: 'diarias_pacotes.margem_contribuicao',
                },
            ],
        },
        {
            header: 'Mão de Obra Direta',
            columns: [
                {
                    header: 'Orçado M.O. Direta',
                    accessorKey: 'mao_obra_direta.orcado_mod',
                },
                {
                    header: 'Custo Aberto',
                    accessorKey: 'mao_obra_direta.custo_aberto',
                },
                {
                    header: 'Custo Total',
                    accessorKey: 'mao_obra_direta.custo_total',
                    cell: info => (
                        <a onClick={() => handleOpenModal(info.row.original.atendimento)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {info.getValue() as string}
                        </a>
                    ),
                },
                {
                    header: 'M.C.',
                    accessorKey: 'mao_obra_direta.margem_contribuicao',
                },
                {
                    header: 'C./R.',
                    accessorKey: 'mao_obra_direta.custo_receita',
                },
            ],
        },
        {
            header: 'Materiais e Medicamentos',
            columns: [
                {
                    header: 'Orçado Mat/Med',
                    accessorKey: 'materias_medicamentos.orcado_mat',
                },
                {
                    header: 'Custo Aberto',
                    accessorKey: 'materias_medicamentos.custo_aberto',
                },
                {
                    header: 'Custo Total',
                    accessorKey: 'materias_medicamentos.custo_total',
                },
                {
                    header: 'M.C.',
                    accessorKey: 'materias_medicamentos.margem_contribuicao',
                },
                {
                    header: 'C./R.',
                    accessorKey: 'materias_medicamentos.custo_receita',
                },
            ],
        },
        {
            header: 'Equipamentos e Gases',
            columns: [
                {
                    header: 'Orçado Equip/Gas',
                    accessorKey: 'equipamentos_gases.orcado_eqg',
                },
                {
                    header: 'Custo Aberto',
                    accessorKey: 'equipamentos_gases.custo_aberto',
                },
                {
                    header: 'Custo Total',
                    accessorKey: 'equipamentos_gases.custo_total',
                },
                {
                    header: 'M.C.',
                    accessorKey: 'equipamentos_gases.margem_contribuicao',
                },
                {
                    header: 'C./R.',
                    accessorKey: 'equipamentos_gases.custo_receita',
                },
            ],
        },
        {
            header: 'Outros Insumos',
            columns: [
                {
                    header: 'Orçado Outros',
                    accessorKey: 'outros_insumos.orcado_out',
                },
                {
                    header: 'Custo Aberto',
                    accessorKey: 'outros_insumos.custo_aberto',
                },
                {
                    header: 'Custo Total',
                    accessorKey: 'outros_insumos.custo_total',
                },
                {
                    header: 'M.C.',
                    accessorKey: 'outros_insumos.margem_contribuicao',
                },
                {
                    header: 'C./R.',
                    accessorKey: 'outros_insumos.custo_receita',
                },
                {
                    header: 'Custo Imp/Taxas',
                    accessorKey: 'outros_insumos.custo_impostos',
                },
            ],
        },
    ];

    const table = useReactTable({
        data: Atendimentos,
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
        <div className='table_holder'>
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

            {selectedAtendimento && (
                <DadosMod
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    dadosAtendimento={selectedAtendimento}
                />
            )}
        </div>
    );
}