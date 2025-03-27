'use client'; // Indica que este é um Client Component

import { useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, ColumnDef, flexRender, SortingState, ColumnFiltersState } from '@tanstack/react-table';
import { DadosAtendimento, PlanilhaAtendimentos } from '../../types/types';
import DadosMod from '../ModalInfos/ModalInfos';
import CustomTableComponent from '@/app/components/ui/CustomTable/component';
import CustomModal from '@/app/components/ui/CustomModal/component';


interface OrcamentosComponentProps {
  Atendimentos: Array<PlanilhaAtendimentos>;
}

export default function PlanilhaAtendimentosComponent({ Atendimentos }: OrcamentosComponentProps) {

    const columns: ColumnDef<PlanilhaAtendimentos>[] = [
        {
            header: 'Dados do Atendimento',
            columns: [
                {
                    header: 'Atd.',
                    accessorKey: 'atendimento.atendimento',
                    cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // 
                },
                {
                    header: 'Paciente',
                    accessorKey: 'atendimento.paciente',
                    cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span className='td_nome'>{info.getValue() as string}</span>,
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
                        <CustomModal
                            opener={<span style={{ cursor: 'pointer', color: 'blue' }}>{info.row.original.mao_obra_direta.custo_total}</span>}
                            size='large'
                        >
                            <DadosMod
                                dadosAtendimento={info.row.original.atendimento}
                            />
                        </CustomModal>
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

    return (
        <div className='table_holder'>
            <CustomTableComponent
                columns={columns}
                data={Atendimentos}
            />
        </div>
    );
}