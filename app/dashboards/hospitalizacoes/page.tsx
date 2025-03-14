'use client';

import { useEffect, useState } from "react";

import '../styles.css';
import './styles.css';
import '@/app/components/css/table.css';
import MultiSelectComponent from "@/app/components/ui/MultiSelect/component";
import DatePickerComponent from "@/app/components/ui/DatePicker/component";

import BarChart from "@/app/components/ui/BarChart/component";
import InfoShower from "../components/InfoShower/component";
import useFetchData from '@/app/hooks/useFetchData';
import { useDateRange } from "@/app/hooks/useDateRange";
import CustomTableComponent from "@/app/components/ui/CustomTable/component";

interface hospitalizacoes {
    atendimentos: number;
    internacoes: number;
    df_internacoes: internacaoData[];
    table_ultimas_hospitalizacoes: hospitalizacoesTable[];
    operadoras: KeyValue[];
}

interface KeyValue {
    label: string;
    value: string;
}

interface internacaoData {
    mes: string;
    internacoes: number;
    atendimentos: number;
    percentual: number;
    meta: number;
}

interface hospitalizacoesTable {
    paciente: string;
    operadora: string;
    data: string;
}


export default function HospitalizacoesDashboard() {
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
    const [selectedOperadoras, setSelectedOperadoras] = useState<string[]>([]);
    const { data: hospitalizacoesData, loading } = useFetchData<hospitalizacoes>({
        endpoint: 'dashboards/hospitalizacoes',
        body: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
            operadoras: selectedOperadoras,
        },
        defaultData: {
            atendimentos: 0,
            internacoes: 0,
            df_internacoes: [],
            table_ultimas_hospitalizacoes: [],
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
                        options={hospitalizacoesData.operadoras}
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
                        text="internações"
                        value={hospitalizacoesData.internacoes}
                    />
                    <InfoShower
                        text="atendimentos"
                        value={hospitalizacoesData.atendimentos}
                    />
                </div>
            </div>
            
            
            <div className="dashboard__content">
                <div className="dashboard__content__chart__full">
                    <BarChart
                        datasets={[
                            {
                                label: 'Atendimentos',
                                data: hospitalizacoesData.df_internacoes.map((data) => data.atendimentos),
                                backgroundColor: 'rgba(35, 118, 241, 0.6)',
                                borderColor: 'rgba(35, 118, 241, 0.6)',
                                borderWidth: 1,
                            },
                            {
                                label: '%',
                                data: hospitalizacoesData.df_internacoes.map((data) => data.percentual),
                                backgroundColor: 'rgba(241, 35, 131, 0.6)',
                                borderColor: 'rgba(241, 35, 131, 0.6)',
                                borderWidth: 1,
                                type: 'line',
                                yAxisID: 'yAxis', // Associando ao eixo yAxis
                            },
                            {
                                label: 'Meta',
                                data: hospitalizacoesData.df_internacoes.map((data) => data.meta),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                type: 'line',
                                yAxisID: 'yAxis', // Associando ao eixo yAxis
                            }
                        ]}
                        options={{
                            scales: {
                                yAxis: {
                                    beginAtZero: true,
                                    position: 'right', // Eixo y secundário à direita
                                    grid: {
                                        display: false,
                                    },
                                },
                            },
                        }}
                        labels={hospitalizacoesData.df_internacoes.map((data) => data.mes)}
                        key={'internacoes'}
                        title="Internações e Atendimentos"
                    />
                </div>
                <div className="dashboard__content__chart">
                    <BarChart
                        datasets={
                            [
                                {
                                    label: 'Internações',
                                    data: hospitalizacoesData.df_internacoes.map((data) => data.internacoes),
                                    backgroundColor: 'rgba(35, 118, 241, 0.6)',
                                    borderColor: 'rgba(35, 118, 241, 0.6)',
                                    borderWidth: 1,
                                }
                            ]
                        }
                        labels={hospitalizacoesData.df_internacoes.map((data) => data.mes)}
                        key={'internacoes'}
                        title="Internações e Atendimentos"
                    />
                </div>
                <div className="dashboard__content__chart">
                    <CustomTableComponent
                        style={{ maxHeight: '300px' }}
                        data={hospitalizacoesData.table_ultimas_hospitalizacoes}
                        columns={[
                            {
                                header: 'Paciente',
                                accessorKey: 'paciente',
                                cell: info => <span>{info.getValue() as string}</span>,
                            },
                            {
                                header: 'Data Ocorrência',
                                accessorKey: 'data',
                                cell: info => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
                                sortingFn: (a, b) => {
                                    return new Date(a.original.data).getTime() - new Date(b.original.data).getTime();
                                },
                            },
                            {
                                header: 'Operadora',
                                accessorKey: 'operadora',
                                cell: info => <span>{info.getValue() as string}</span>,
                            },
                        ]}
                        key={'internacoes'}
                    />
                </div>
            </div>
        </div>
    );
}