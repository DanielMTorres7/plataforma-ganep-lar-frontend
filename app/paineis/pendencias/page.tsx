'use client';


import useFetchData from '@/app/hooks/useFetchData';
import CustomTableComponent from '@/app/components/ui/CustomTable/component';
import './styles.css';

interface BolinhaData {
    OPERADORA: string;
    VISITAS: number;
    INTERCORRENCIAS: number;
    CCIDS: number;
    SCORE_BRADEN: number;
}

export default function LPPDashboard() {
    const { data: GestaoRiscoData, loading } = useFetchData<BolinhaData[]>({
        endpoint: 'paineis/bolinha',
        body: {
            data_inicio: '2024-12-01',
            data_fim: '2024-12-31',
        }, 
        defaultData: [],
    });

    function getClass() {
        let rand = Math.floor(Math.random() * (10 - 0 + 1) + 0)
        return rand === 1 ? 'red_ball' : rand === 2 ? 'green_ball' : '';
    }

    return (
        <div className="dashboard" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <CustomTableComponent
                columns={
                    [
                        {
                            header: 'Operadora',
                            accessorKey: 'OPERADORA',
                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // 
                        },
                        {
                            header: 'Visitas',
                            accessorKey: 'VISITAS',
                            cell: info => <span className='ball-holder'><span className={getClass()}>{info.getValue() as number}</span></span>,
                        },
                        {
                            header: 'Intercorrências',
                            accessorKey: 'INTERCORRENCIAS',
                        },
                        {
                            header: 'CCIDS',
                            accessorKey: 'CCIDS',
                        },
                        {
                            header: 'Score Braden',
                            accessorKey: 'SCORE_BRADEN',
                        }
                    ]
                }
                data={GestaoRiscoData}
            />
        </div>
    );
}