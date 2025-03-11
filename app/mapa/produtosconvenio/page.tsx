'use client';

import { useState, useEffect } from 'react';
import '@/app/components/css/table.css';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, SortingState, ColumnFiltersState } from "@tanstack/react-table";
import './styles.css';
import InfoCellCompoent from '../components/InfoCellCompoent';
import useFetchData from '@/app/hooks/useFetchData';
import ProdutosConvenioTable from './components/ProdutosConvenioTable/component';

interface ProdutosConvenio {
    operadora: string; 
    produto: string; 
    diario: Diario[]; 
    media: number;
}
interface Diario{
    dia: string;
    total: number;
    entradas?: string[];
    saidas?: string[];
}

interface resp {
    operadoras: ProdutosConvenio[];
}

export default function OrcamentosPage() {
    const [tableData, setTableData] = useState<any[]>([]); // Estado para tableData

    const { data: data, loading } = useFetchData<resp>({
        endpoint: 'produtosconvenio',
        body: {}, 
        defaultData: {
            operadoras: [],
        },
    });
    
    // Transformar os dados para o formato esperado pela tabela
    useEffect(() => {
        console.log("Dados recebidos:", data); // Verifique a estrutura de data
        
        if (!data || loading) {
            return;
        }
        
        const transformedData = data.operadoras.map((operadora) => {
            const pacientesPorDia: Record<string, Diario> = {};

            // Preencher os totais de pacientes por dia
            operadora.diario.forEach((diaInfo, index) => {
                pacientesPorDia[`${index + 1}`] = diaInfo;
            });

            return {
                operadora: operadora.operadora,
                produto: operadora.produto,
                ...pacientesPorDia, // Espalhar os totais de pacientes por dia
                media: operadora.media,
            };
        });

        console.log("Dados transformados:", transformedData); // Verifique os dados transformados
        setTableData(transformedData);
        
    }, [data, loading]);
    
    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className='holder'>
            <ProdutosConvenioTable tableData={tableData} />
        </div>
    );
}