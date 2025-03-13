'use client';

import { useEffect, useState } from 'react';
import '../styles.css';
import './styles.css';
import '@/app/components/css/table.css';
import MultiSelectComponent from "@/app/components/ui/MultiSelect/component";
import DatePickerComponent from "@/app/components/ui/DatePicker/component";
import BarChart from "@/app/components/ui/BarChart/component";
import InfoShower from "../components/InfoShower/component";
import { DispositivosData } from "./interfaces";
import useFetchData from '@/app/hooks/useFetchData';
import { useDateRange } from "@/app/hooks/useDateRange";
import DispositivosInfoShower from './components/DispositivosInfoShower/component';

export default function LPPDashboard() {
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
    const [selectedOperadoras, setSelectedOperadoras] = useState<string[]>([]);
    const { data: DispositivosData, loading } = useFetchData<DispositivosData>({
        endpoint: 'dashboards/dispositivos',
        body: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
            operadoras: selectedOperadoras,
        }, 
        defaultData: {
            atendimentos: 0, 
            cvd: [],
            cva: [],
            gtt: [],
            sne: [],
            tqt: [],
            picc: [],
            df_dispositivos: [],
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
                    <DispositivosInfoShower text="CVD" value={DispositivosData.cvd.length} atendimentos={DispositivosData.cvd} />
                    <DispositivosInfoShower text="CVA" value={DispositivosData.cva.length} atendimentos={DispositivosData.cva} />
                    <DispositivosInfoShower text="GTT" value={DispositivosData.gtt.length} atendimentos={DispositivosData.gtt} />
                    <DispositivosInfoShower text="SNE" value={DispositivosData.sne.length} atendimentos={DispositivosData.sne} />
                    <DispositivosInfoShower text="TQT" value={DispositivosData.tqt.length} atendimentos={DispositivosData.tqt} />
                    <DispositivosInfoShower text="PICC" value={DispositivosData.picc.length} atendimentos={DispositivosData.picc} />
                    
                </div>
            </div>

            <div className="dashboard__content">
                <div className="dashboard__content__chart">
                    <BarChart
                        key={'dispositivos_respiratorios'}
                        labels={(DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.mes)) || []}
                        datasets={[
                            {
                                label: 'TQT',
                                data: (DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.tqt)) || [],
                                borderColor: 'rgba(35, 118, 241, 0.6)',
                                type: 'line',
                            },
                        ]}
                        title="Dispositivos Respiratórios"
                    />
                </div>

                <div className="dashboard__content__chart">
                    <BarChart
                        key={'dispositivos_gastricos'}
                        labels={(DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.mes)) || []}
                        datasets={[
                            {
                                label: 'GTT',
                                data: (DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.gtt)) || [],
                                borderColor: 'rgba(35, 118, 241, 0.6)',
                                type: 'line',
                            },
                            {
                                label: 'SNE',
                                data: (DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.sne)) || [],
                                borderColor: 'rgba(241, 35, 131, 0.6)',
                                type: 'line',
                            },
                        ]}
                        title="Dispositivos Gastricos"
                    />
                </div>

                <div className="dashboard__content__chart">
                    <BarChart
                        key={'dispositivos_urinarios'}
                        labels={(DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.mes)) || []}
                        datasets={[
                            {
                                label: 'CVD',
                                data: (DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.cvd)) || [],
                                borderColor: 'rgba(35, 118, 241, 0.6)',
                                type: 'line',
                            },
                            {
                                label: 'CVA',
                                data: (DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.cva)) || [],
                                borderColor: 'rgba(241, 35, 131, 0.6)',
                                type: 'line',
                            },
                        ]}
                        title="Dispositivos Urinarios"
                    />
                </div>

                <div className="dashboard__content__chart">
                    <BarChart
                        key={'dispositivos_acesso_venoso'}
                        labels={(DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.mes)) || []}
                        datasets={[
                            {
                                label: 'PICC',
                                data: (DispositivosData.df_dispositivos && DispositivosData.df_dispositivos.map((df) => df.picc)) || [],
                                borderColor: 'rgba(35, 118, 241, 0.6)',
                                type: 'line',
                            },
                        ]}
                        title="Dispositivos Acesso Venoso"
                    />
                </div>
            </div>
        </div>
    );
}