'use client'; // Indica que este é um Client Component

import { useState, useEffect } from 'react';
import OrcamentosComponent from './components/HeaderOrcamentos/HeaderOrcamentos';
import { OrcamentoData } from '../types/types';
import './styles.css';
import SearchOrcamentosComponent from './components/SearchOrcamento/SearchOrcamentos';
import useFetchData from '@/app/hooks/useFetchData';

export default function OrcamentosPage() {
    const [searchDate, setSearchDate] = useState<string | null>(null); // Estado para a data de pesquisa

    // Função para lidar com a pesquisa
    const handleSearch = (date: string) => {
        setSearchDate(date); // Atualiza o estado da data de pesquisa
    };

    const { data: orcamentos, loading } = useFetchData<OrcamentoData>({
        endpoint: 'orcamentos', // Só envia o body se searchDate existir
        defaultData: {
            title : '',
            orcado: 0,
            custo: 0,
            custo_nao_orcado: 0,
            receita_nao_realizada: 0,
            atendimentos: 0,
            ticket_medio: 0,
            margem_contribuicao_geral: '',
            margem_contribuicao_dia: '',
            margem_contribuicao_mod: '',
            margem_contribuicao_mat: '',
            margem_contribuicao_eqg: '',
            margem_contribuicao_out: '',
            margem_participacao_dia: 0,
            margem_participacao_mod: 0,
            margem_participacao_mat: 0,
            margem_participacao_eqg: 0,
            margem_participacao_out: 0,
            margem_participacao_imp: 0,
            custo_receita_mod: '',
            custo_receita_mat: '',
            custo_receita_eqg: '',
            custo_receita_out: '',
            custo_receita_imp: '',
            children: [],
        },
        body: {},
    });

    if (loading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <>
            <div className='holder'>
                {orcamentos === null && <SearchOrcamentosComponent onSearch={handleSearch} />}
                {orcamentos !== null && <OrcamentosComponent data={orcamentos} />}
            </div>
        </>
    );
}