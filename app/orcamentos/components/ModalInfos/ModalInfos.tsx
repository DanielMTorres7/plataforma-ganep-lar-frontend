'use client'; // Indica que este é um Client Component

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState, useEffect } from 'react';
import { DadosAtendimento } from '../../types/types';
import './styles.css';

import useFetchData from '@/app/hooks/useFetchData';
import CustomTableComponent from "@/app/components/ui/CustomTable/component";

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
    dadosAtendimento: DadosAtendimento; // Dados necessários para a requisição
}

export default function DadosMod({ dadosAtendimento }: DadosModProps) {
    const { data: infos, loading } = useFetchData<Array<resposta>>({
        endpoint: 'detalhesmod',
        body: { 
            mes: dadosAtendimento.mes,
            atendimento: dadosAtendimento.atendimento,
        }, // Só envia o body se dadosAtendimento existir
    });


    if (loading || !infos) {
        return <p>Carregando...</p>;
    }

    return (
        <CustomTableComponent
            columns={
                [
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
                        cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                    },
                    {
                        header: 'Conselho',
                        accessorKey: 'conselho',
                        cell: info => <span>{info.getValue() as string}</span>,
                    },
                    {
                        header: 'Empresa',
                        accessorKey: 'empresa',
                        cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
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
                ]
            }
            data={infos}
        />
    );
}