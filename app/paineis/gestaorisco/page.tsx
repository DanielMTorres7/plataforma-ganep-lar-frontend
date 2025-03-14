'use client';

import '@/app/components/css/table.css';
import useFetchData from '@/app/hooks/useFetchData';
import InfoShower from '../components/InfoShower/component';
import SingleGauge from '@/app/components/ui/DoughnutChart/component';
import CustomModal from '@/app/components/ui/CustomModal/component';
import AtendimentosInfoShower from './components/AtendimentosInfoShower/component';
import { GestaoRiscoData } from './interfaces/gestaoRisco';


export default function LPPDashboard() {
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
                <AtendimentosInfoShower
                    label={'Risco Nutri'}
                    title="Risco Nutri"
                    atendimentos={GestaoRiscoData.n_risco_nutri}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <AtendimentosInfoShower
                    label={'Diabetes'}
                    title="Diabetes"
                    atendimentos={GestaoRiscoData.n_diabetes}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <AtendimentosInfoShower
                    atendimentos={GestaoRiscoData.n_AD}
                    label={'AD'}
                    title="AD"
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <AtendimentosInfoShower
                    label={'ID'}
                    title="ID"
                    atendimentos={GestaoRiscoData.n_ID}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <AtendimentosInfoShower
                    label={'GTT'}
                    title="GTT"
                    atendimentos={GestaoRiscoData.n_gtt}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
            <div>
                <AtendimentosInfoShower
                    label={'SNE'}
                    title="SNE"
                    atendimentos={GestaoRiscoData.n_sne}
                    max={GestaoRiscoData.n_atendimentos}
                />
            </div>
        </div>
    );
}