'use client';

import { useEffect, useState } from "react";
import '../styles.css';
import './styles.css';
import '@/app/components/css/table.css';
import LppTableComponent from "./components/LastLppTable/LppTable";
import MultiSelectComponent from "@/app/components/ui/MultiSelect/component";
import DatePickerComponent from "@/app/components/ui/DatePicker/component";

import BarChart from "@/app/components/ui/BarChart/component";
import InfoShower from "../components/InfoShower/component";
import useFetchData from '@/app/hooks/useFetchData';
import { useDateRange } from "@/app/hooks/useDateRange";
interface LppTable {
    PACIENTE: string;
    ATENDIMENTO: string;
    OPERADORA: string;
    DATA_INICIO: string;
}

interface KeyValue {
    label: string;
    value: string;
}

interface ScoreBradenMensal {
    mes: string;
    score_braden: number;
    percentual: number;
    lpps: number;
}

interface LppData {
    operadoras: KeyValue[];
    lpp_table: LppTable[];
    score_braden_mensal: ScoreBradenMensal[];
    pacientes_classificados_score_braden: number;
    numero_lpps: number;
}

export default function LPPDashboard() {
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
    const [selectedOperadoras, setSelectedOperadoras] = useState<string[]>([]);
    const { data: LppData, loading } = useFetchData<LppData>({
        endpoint: 'dashboards/lpp',
        body: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
            operadoras: selectedOperadoras,
        },
        defaultData: { 
            operadoras: [], 
            lpp_table: [], 
            score_braden_mensal: [], 
            pacientes_classificados_score_braden: 0,
            numero_lpps: 0,
        },
    });

    return (
        <div className="dashboard">
            <div className="filters">
                <p>Filtros</p>
                <div className="filter">
                    <label>Operadoras</label>
                    <MultiSelectComponent
                        options={LppData.operadoras}
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
                        className="info-shower"
                        text="Pacientes classificados"
                        value={LppData.pacientes_classificados_score_braden}
                    />
                    <InfoShower
                        className="info-shower"
                        text="LPPs"
                        value={LppData.numero_lpps}
                    />
                </div>
            </div>
            
            
            <div className="dashboard__content">
                <div className="dashboard__content__chart__full">
                    <BarChart
                        key={'score_braden_mensal'}
                        labels={(LppData.score_braden_mensal && LppData.score_braden_mensal.map((score) => score.mes)) || []}
                        datasets={
                            [
                                {
                                    label: 'Score Braden',
                                    data: (LppData.score_braden_mensal && LppData.score_braden_mensal.map((data) => data.score_braden)) || [],
                                    backgroundColor: 'rgba(35, 118, 241, 0.6)',
                                    yAxisID: 'y',
                                },
                                {
                                    label: '%',
                                    data: (LppData.score_braden_mensal && LppData.score_braden_mensal.map((data) => data.percentual)) || [],
                                    borderColor: 'rgba(241, 35, 131, 0.6)',
                                    type: 'line',
                                    yAxisID: 'yAxis',
                                }
                            ]
                        }
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
                        title="Pacientes classificados na escala de Braden"
                    />
                </div>
                
                <div className="dashboard__content__chart">
                    <BarChart
                        key={'lpp_mensal'}
                        labels={(LppData.score_braden_mensal && LppData.score_braden_mensal.map((lpp) => lpp.mes)) || []}
                        datasets={
                            [
                                {
                                    label: 'LPPs',
                                    data: (LppData.score_braden_mensal && LppData.score_braden_mensal.map((lpp) => lpp.lpps))||[],
                                    backgroundColor: 'rgba(35, 118, 241, 0.6)',
                                },
                            ]
                        }
                        title="Número de LPPs por Mês"
                    />
                </div>

                <div className="dashboard__content__table">
                    <LppTableComponent pacientes={LppData.lpp_table}/>
                </div>
            </div>
        </div>
    );
}