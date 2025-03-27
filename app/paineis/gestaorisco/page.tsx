'use client';


import useFetchData from '@/app/hooks/useFetchData';
import InfoShower from '../components/InfoShower/component';
import AtendimentosInfoShower from './components/AtendimentosInfoShower/component';
import { GestaoRiscoData } from './interfaces/gestaoRisco';
import './styles.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
  PointElement,
  LineElement,
  ChartOptions,
  ArcElement
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import CustomModal from '@/app/components/ui/CustomModal/component';
import { useState } from 'react';
import CustomTableComponent from '@/app/components/ui/CustomTable/component';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

export default function LPPDashboard() {
    const [trigger, setTrigger] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(<></>);

    const { data: GestaoRiscoData, loading } = useFetchData<GestaoRiscoData>({
        endpoint: 'paineis/gestaorisco',
        body: {}, 
        defaultData: {
            n_atendimentos: 0, 
            n_risco_nutri: [],
            n_ID: [],
            n_AD: [],
            n_gtt: [],
            n_sne: [],
            n_diabetes: [],
            visitas: [],
            n_ccids:[],
            n_tqt: [],
        },
    });

    return (
        <div className="dashboard" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <InfoShower
                text="Atendimentos"
                value={GestaoRiscoData.n_atendimentos}
                style={{ width: '100%'}}
            />
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    label={'ID'}
                    title="ID"
                    atendimentos={GestaoRiscoData.n_ID}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    atendimentos={GestaoRiscoData.n_AD}
                    label={'AD'}
                    title="AD"
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    label={'Risco Nutri'}
                    title="Risco Nutri"
                    atendimentos={GestaoRiscoData.n_risco_nutri}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    label={'Diabetes'}
                    title="Diabetes"
                    atendimentos={GestaoRiscoData.n_diabetes}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    label={'GTT'}
                    title="GTT"
                    atendimentos={GestaoRiscoData.n_gtt}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    label={'TQT'}
                    title="TQT"
                    atendimentos={GestaoRiscoData.n_tqt}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    label={'SNE'}
                    title="SNE"
                    atendimentos={GestaoRiscoData.n_sne}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div className="dashboard__gauge">
                <AtendimentosInfoShower
                    label={'CCIDS'}
                    title="CCIDS"
                    atendimentos={GestaoRiscoData.n_ccids}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div style={{ width: '30%' }}>
                <Chart
                    type="doughnut"
                    data={{
                        labels: GestaoRiscoData.visitas.map((visita) => visita.ESPECIALIDADE),
                        datasets: [{
                            label: 'Visitas',
                            data: GestaoRiscoData.visitas.map((visita) => visita.VISITCOUNT),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    }}
                    
                    options={{
                        onClick: (e: any) => {
                            console.log(e);
                            const chart = e.chart;
                            const content = chart.getElementsAtEventForMode(e, 'index', { intersect: true }, false);
                            if (!content.length) return;
                            var index = content[0].index;
                            var label = chart.data.labels[index];
                            var value = GestaoRiscoData.visitas[index].PACIENTES;
                            console.log(label, value);
                            setTrigger(true);
                            setModalContent(
                                <CustomTableComponent
                                    columns={[
                                        {
                                            header: 'Paciente',
                                            accessorKey: 'PACIENTE',
                                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                                        },
                                        {
                                            header: 'Prontuário',
                                            accessorKey: 'PRONTUARIO',
                                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                                        },
                                        {
                                            header: 'Atendimento',
                                            accessorKey: 'ATENDIMENTO',
                                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                                        },
                                        {
                                            header: 'Operadora',
                                            accessorKey: 'OPERADORA',
                                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                                        },
                                        {
                                            header: 'Visitas',
                                            accessorKey: 'VISITCOUNT',
                                            cell: info => <span>{info.getValue() as number}</span>,
                                        },
                                    ]}
                                    data={value}
                                    style={{ maxHeight: '500px' }}
                                >
                                </CustomTableComponent>
                            );
                        },
                        responsive: true,
                        aspectRatio: 1.5,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Visitas',
                            },
                            legend: {
                                display: true,
                                position: 'right',
                            },
                        },
                    }}
                />
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