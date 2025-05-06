'use client';

import { useEffect, useState } from "react";

import '../styles.css';
import './styles.css';

import MultiSelectComponent from "@/app/components/ui/MultiSelect/component";
import DatePickerComponent from "@/app/components/ui/DatePicker/component";

import BarChart from "@/app/components/ui/BarChart/component";
import useFetchData from '@/app/hooks/useFetchData';
import InfoShower from "../components/InfoShower/component";
import { useDateRange } from "@/app/hooks/useDateRange";
import CustomTableComponent from "@/app/components/ui/CustomTable/component";

interface KeyValue {
    label: string;
    value: string;
}

interface InfeccoesData {
    atendimentos: number;
    itus: number;
    infeccoes: number;
    table_last_infeccoes: TableLastInfeccoesData[];
    df_infeccoes: DFInfeccoesData[];
    operadoras: KeyValue[];
}
interface TableLastInfeccoesData {
    NOME_PACIENTE: string;
    DATA_OCORRENCIA: string;
    TIPO_INFECCAO: string;
    OPERADORA: string;
}
interface DFInfeccoesData {
    mes: string;
    itus: number;
    infeccoes: number;
    atendimentos: number;
    percentual: number;
    meta: number;
}


export default function MovimentacoesDashboard() {
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
    const [selectedOperadoras, setSelectedOperadoras] = useState<string[]>([]);
    const { data: InfeccoesData, loading } = useFetchData<InfeccoesData>({
        endpoint: 'dashboards/infeccoes',
        body: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
            operadoras: selectedOperadoras,
        },
        defaultData: { 
            atendimentos: 0,
            itus: 0,
            infeccoes: 0,
            table_last_infeccoes: [],
            df_infeccoes: [],
            operadoras: [],
        },
    });

    return (
        <div className="dashboard">
            <div className="filters">
                <p>Filtros</p>
                <div className="filter">
                    <label>Operadoras</label>
                    <MultiSelectComponent
                        options={InfeccoesData.operadoras}
                        onChange={(selectedOptions) => setSelectedOperadoras(selectedOptions.map((op:any) => op.value))}
                        placeholder="Selecione..."
                    />
                </div>
                <div className="filter">
                    <label>Data Início</label>
                    <DatePickerComponent
                        value={{ startDate: new Date(startDate), endDate: new Date(endDate) }}
                        onChange={(dates) => {
                            setStartDate((dates.startDate ? dates.startDate : new Date(new Date().getFullYear(), 0, 1)));
                            setEndDate((dates.endDate ? dates.endDate : new Date()));
                        }}
                    />
                </div>
                <div className="values">
                    <InfoShower
                        className="info-shower-full"
                        text="atendimentos"
                        value={InfeccoesData.atendimentos}
                    />
                    <InfoShower
                        className="info-shower"
                        text="itus"
                        value={InfeccoesData.itus}
                    />
                    <InfoShower
                        className="info-shower"
                        text="infeccoes"
                        value={InfeccoesData.infeccoes}
                    />
                </div>
            </div>
            
            
            <div className="dashboard__content">
                <div className="dashboard__content__chart__full">
                    <BarChart
                        key={'percentual_infeccoes'}
                        labels={(InfeccoesData.df_infeccoes && InfeccoesData.df_infeccoes.map((df) => df.mes)) || []}
                        datasets={
                            [
                                {
                                    label: 'Percentual',
                                    data: (InfeccoesData.df_infeccoes && InfeccoesData.df_infeccoes.map((df) => df.percentual))||[],
                                    borderColor: 'rgba(35, 118, 241, 0.6)',
                                    type: 'line',
                                    yAxisID: 'y1',
                                    tension: 0.2,
                                    pointStyle: 'circle',
                                    pointRadius: 2,
                                    fill:'start',
                                },
                                {
                                    label: 'Meta',
                                    data: (InfeccoesData.df_infeccoes && InfeccoesData.df_infeccoes.map((df) => df.meta))||[],
                                    borderColor: 'rgba(241, 35, 131, 0.6)',
                                    type: 'line',
                                    yAxisID: 'y1',
                                    borderDash: [5, 2],
                                    tension: 0.2,
                                    pointStyle: 'circle',
                                    pointRadius: 2,
                                }
                            ]
                        }
                        options={{
                            scales: {
                                y1: {
                                    position: 'right',
                                    beginAtZero: true,
                                    grid: {
                                        display: false,
                                    },
                                },
                            },
                        }}
                        title="Infeccoes"
                    />
                </div>
                <div className="dashboard__content__chart">
                        <BarChart
                            key={'infecoes'}
                            labels={(InfeccoesData.df_infeccoes && InfeccoesData.df_infeccoes.map((df) => df.mes)) || []}
                            datasets={
                                [
                                    {
                                        label: 'Itus',
                                        data: (InfeccoesData.df_infeccoes && InfeccoesData.df_infeccoes.map((df) => df.itus))||[],
                                        backgroundColor: 'rgba(35, 117, 241, 0.3)',
                                        borderColor: 'rgba(35, 117, 241, 0.6)',
                                        borderWidth: 2.5,
                                        borderRadius: 10,
                                    },
                                    {
                                        label: 'Infeccoes',
                                        data: (InfeccoesData.df_infeccoes && InfeccoesData.df_infeccoes.map((df) => df.infeccoes))||[],
                                        backgroundColor: 'rgba(241, 35, 131, 0.3)',
                                        borderColor: 'rgba(241, 35, 131, 0.6)',
                                        borderWidth: 2.5,
                                        borderRadius: 10,
                                    },
                                ]
                            }
                            
                        />
                    </div>
                <div className="dashboard__content__table">
                    <CustomTableComponent
                        style={{ maxHeight: '300px' }}
                        data={InfeccoesData.table_last_infeccoes}
                        columns={
                            [
                                // {
                                //     header: 'Prontuário',
                                //     accessorKey: 'PRONTUARIO'
                                // },
                                {
                                    header: 'Atendimento',
                                    accessorKey: 'ATENDIMENTO'
                                },
                                {
                                    header: 'Paciente',
                                    accessorKey: 'NOME_PACIENTE',
                                    cell: info => <span>{String(info.getValue() as string).split(" ").map((n)=>{
                                        return n.charAt(0).toUpperCase();
                                    })}</span>
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
                                    header: 'Tipo Infeccao',
                                    accessorKey: 'TIPO_INFECCAO',
                                    cell: info => <span>{info.getValue() as string}</span>,
                                },
                                {
                                    header: 'Operadora',
                                    accessorKey: 'OPERADORA'
                                },
                            ]
                        }
                    />
                </div>
            </div>
        </div>
    );
}