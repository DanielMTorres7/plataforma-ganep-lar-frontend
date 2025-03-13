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
import AtendimentosInfoShower from "./components/AtendimentosInfoShower/component";

interface KeyValue {
    label: string;
    value: string;
}

interface DispositivosData {
    atendimentos: number;
    altas: number;
    entradas: number;
    df_atendimentos: DfAtendimento[];
    df_altas: Array<{
        mes: string;
        motivos: {
            [key: string]: number;
        };
    }>;
    operadoras: KeyValue[];
    motivos: {
        [key: string]: antendimento[];
    };
}
interface DfAtendimento {
    mes: string;
    atendimentos: number;
    altas: number;
    entradas: number;
}

interface antendimento {
    ENTRADA: string;
    STATUS: string;
    ALTA: string;
    MOTIVO_ALTA: string;
    OPERADORA: string;
    PACIENTE: string;
    ATENDIMENTO: string;
    PRONTUARIO: string;
}


export default function MovimentacoesDashboard() {
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
    const [selectedOperadoras, setSelectedOperadoras] = useState<string[]>([]);
    const { data: DispositivosData, loading } = useFetchData<DispositivosData>({
        endpoint: 'dashboards/movimentacoes',
        body: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
            operadoras: selectedOperadoras,
        },
        defaultData: { 
            atendimentos: 0,
            altas: 0,
            entradas: 0,
            df_atendimentos: [],
            df_altas: [],
            operadoras: [],
            motivos: {},
        },
    });
    const colors = [
        'rgba(35, 118, 241, 0.6)',
        'rgba(241, 35, 131, 0.6)',
        'rgba(35, 241, 97, 0.6)',
        'rgba(241, 196, 35, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
    ];

    return (
        <div className="dashboard">
            <div className="filters">
                <h1>Movimentações</h1>
                <p>Filtros</p>
                <div className="filter">
                    <label>Operadoras</label>
                    <MultiSelectComponent
                        options={DispositivosData.operadoras}
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
                        text="Atendimentos"
                        value={DispositivosData.atendimentos.toString()}
                    />
                    <InfoShower
                        text="Altas"
                        value={DispositivosData.altas.toString()}
                    />
                    <InfoShower
                        text="Entradas"
                        value={DispositivosData.entradas.toString()}
                    />
                    {
                        DispositivosData.motivos && Object.keys(DispositivosData.motivos).map((key) => (
                            <AtendimentosInfoShower
                                key={key}
                                text={key}
                                value={DispositivosData.motivos[key].length.toString()}
                                style={{ backgroundColor: colors[Object.keys(DispositivosData.motivos).indexOf(key) % colors.length] }}
                                atendimentos={DispositivosData.motivos[key]}
                            />
                        ))
                    }
                </div>
            </div>
            
            
            <div className="dashboard__content">
                <div className="dashboard__content__chart__full">
                    <BarChart
                        key={'dispositivos_respiratorios'}
                        labels={(DispositivosData.df_altas && DispositivosData.df_altas.map((df: { mes: string }) => df.mes)) || []}
                        datasets={
                            [
                                // para cada chave em df_altas, crie um dataset com uma cor diferente
                                ...Array.from(new Set(DispositivosData.df_altas.flatMap(df => Object.keys(df.motivos)))).map((key, index) => {
                                    return {
                                        label: key,
                                        data: DispositivosData.df_altas.map((df) => df.motivos[key] || 0),
                                        backgroundColor: colors[index % colors.length],
                                        stack: 'stack1',
                                    };
                                }),
                            ]
                        }
                        options={{
                            scales: {
                                y: {
                                    stacked: true,
                                },
                            },
                        }}
                        title="Motivos de Altas"
                    />
                </div>
                
                <div className="dashboard__content__chart__full">
                    <BarChart
                        key={'dispositivos_gastricos'}
                        labels={(DispositivosData.df_atendimentos && DispositivosData.df_atendimentos.map((df) => df.mes)) || []}
                        datasets={
                            [
                                {
                                    label: 'Atendimentos',
                                    data: (DispositivosData.df_atendimentos && DispositivosData.df_atendimentos.map((df) => df.atendimentos))||[],
                                    backgroundColor: 'rgba(35, 118, 241, 0.6)',
                                },
                                {
                                    label: 'Altas',
                                    data: (DispositivosData.df_atendimentos && DispositivosData.df_atendimentos.map((df) => df.altas))||[],
                                    borderColor: 'rgba(241, 35, 131, 0.6)',
                                    type: 'line',
                                    yAxisID: 'y1',
                                },
                                {
                                    label: 'Entradas',
                                    data: (DispositivosData.df_atendimentos && DispositivosData.df_atendimentos.map((df) => df.entradas))||[],
                                    borderColor: 'rgba(35, 241, 97, 0.6)',
                                    type: 'line',
                                    yAxisID: 'y1',
                                },
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
                        title="Atendimentos, Altas e Entradas"
                    />
                </div>
            </div>
        </div>
    );
}