'use client';

import '@/app/components/css/table.css';
import useFetchData from '@/app/hooks/useFetchData';
import InfoShower from '../components/InfoShower/component';
import SingleGauge from '@/app/components/ui/DoughnutChart/component';

interface GestaoRiscoData {
    n_atendimentos: number;
    n_risco_nutri: number;
    n_ID: number;
    n_AD: number;
    n_gtt: number;
    n_sne: number;
    n_diabetes: number;
}


export default function LPPDashboard() {
    const { data: GestaoRiscoData, loading } = useFetchData<GestaoRiscoData>({
        endpoint: 'paineis/gestaorisco',
        body: {}, 
        defaultData: {
            n_atendimentos: 0, 
            n_risco_nutri: 0,
            n_ID: 0,
            n_AD: 0,
            n_gtt: 0,
            n_sne: 0,
            n_diabetes: 0,
        },
    });

    return (
        <div className="dashboard" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <InfoShower
                text="Atendimentos"
                value={GestaoRiscoData.n_atendimentos}
                style={{ width: '100%'}}
            />
            <div>
                <SingleGauge
                    label={'Risco Nutri'}
                    title="Risco Nutri"
                    value={GestaoRiscoData.n_risco_nutri}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <SingleGauge
                    label={'Diabetes'}
                    title="Diabetes"
                    value={GestaoRiscoData.n_diabetes}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <SingleGauge
                    label={'AD'}
                    title="AD"
                    value={GestaoRiscoData.n_AD}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <SingleGauge
                    label={'ID'}
                    title="ID"
                    value={GestaoRiscoData.n_ID}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <SingleGauge
                    label={'GTT'}
                    title="GTT"
                    value={GestaoRiscoData.n_gtt}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <SingleGauge
                    label={'SNE'}
                    title="SNE"
                    value={GestaoRiscoData.n_sne}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
        </div>
    );
}