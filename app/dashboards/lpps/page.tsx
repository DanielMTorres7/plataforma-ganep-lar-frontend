'use client';

import { useEffect, useState } from "react";
import '../styles.css';
import './styles.css';

import MultiSelectComponent from "@/app/components/ui/MultiSelect/component";
import DatePickerComponent from "@/app/components/ui/DatePicker/component";

import BarChart from "@/app/components/ui/BarChart/component";
import InfoShower from "../components/InfoShower/component";
import useFetchData from '@/app/hooks/useFetchData';
import { useDateRange } from "@/app/hooks/useDateRange";
import CustomTableComponent from "@/app/components/ui/CustomTable/component";
import DownloadButton from "@/app/components/ui/buttons/DownloadButton/component";
import CustomModal from "@/app/components/ui/CustomModal/component";
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
    const [trigger, setTrigger] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(<></>);
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
                <DownloadButton
                    fileName={`lpps_${startDate.toISOString().split('T')[0]}_${endDate.toISOString().split('T')[0]}.xlsx`}
                    body={{
                        data_inicio: startDate.toISOString().split('T')[0],
                        data_fim: endDate.toISOString().split('T')[0],
                        operadoras: selectedOperadoras,
                    }}
                    endpoint="download"
                />
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
                                    yAxisID: 'y',
                                },
                                {
                                    label: '%',
                                    data: (LppData.score_braden_mensal && LppData.score_braden_mensal.map((data) => data.percentual)) || [],
                                    type: 'line',
                                    yAxisID: 'yAxis',
                                }
                            ]
                        }
                        title="Pacientes classificados na escala de Braden"
                        onClick={
                            ({ datasetIndex, index }) => {
                                LppData.score_braden_mensal.map((data, dt_index) => {
                                    if (dt_index === index) {
                                        setModalContent(
                                            <div>
                                                <p>{'Score Braden'}</p>
                                                <p>{data.score_braden}</p>
                                            </div>
                                        );
                                        setTrigger(true);
                                    }
                                })
                            }
                        }
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
                                },
                            ]
                        }
                        title="Número de LPPs por Mês"
                        onClick={
                            ({ datasetIndex, index }) => {
                                LppData.score_braden_mensal.map((data, dt_index) => {
                                    if (dt_index === index) {
                                        const dt = data.lpps; 
                                        setModalContent(
                                            <div>
                                                <p>{'lpps'}</p>
                                                <p>{dt}</p>
                                            </div>
                                        );
                                        setTrigger(true);
                                    }
                                })
                            }
                        }
                    />
                </div>

                <div className="dashboard__content__table">
                    <CustomTableComponent
                        style={{ maxHeight: '300px' }}
                        data={LppData.lpp_table}
                        columns={
                            [
                                {
                                    header: 'Paciente',
                                    accessorKey: 'PACIENTE',
                                    cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                                },
                                {
                                    header: 'Data Ocorrência',
                                    accessorKey: 'DATA_INICIO',
                                    cell: info => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
                                    sortingFn: (a, b) => {
                                        return new Date(a.original.DATA_INICIO).getTime() - new Date(b.original.DATA_INICIO).getTime();
                                    },
                                },
                                {
                                    header: 'Operadora',
                                    accessorKey: 'OPERADORA',
                                    cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                                },
                            ]
                        }
                    />
                </div>
            </div>
            <CustomModal
                opener={<></>}
                size="large"
                trigger={trigger}
                onClose={() => setTrigger(false)}
            >
                {modalContent}
            </CustomModal>
        </div>
    );
}