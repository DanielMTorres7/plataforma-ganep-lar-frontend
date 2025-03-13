'use client';

import { useState, useEffect } from 'react';
import '@/app/components/css/table.css';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, SortingState, ColumnFiltersState } from "@tanstack/react-table";
import './styles.css';
import InfoCellCompoent from '../components/InfoCellCompoent';
import useFetchData from '@/app/hooks/useFetchData';
import ProdutosConvenioTable from './components/ProdutosConvenioTable/component';
import { useDateRange } from '@/app/hooks/useDateRange';
import DatePickerComponent from '@/app/components/ui/DatePicker/component';

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
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange({
        // mes atual
        config_startDate: new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), 2)),
        config_endDate: new Date(),
        config_sessionStorage_key: 'produtosconvenio_data',
    }); // Estado para datas

    const { data: data, loading } = useFetchData<resp>({
        endpoint: 'produtosconvenio',
        body: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
        }, 
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
            operadora.diario.forEach((diaInfo) => {
                // dia esta invertido com mes
                pacientesPorDia[`${diaInfo.dia.replace("/2025",'')}`] = diaInfo
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
            <div>
                <DatePickerComponent
                    value={{ startDate: new Date(startDate), endDate: new Date(endDate) }}
                    onChange={(dates) => {
                        setStartDate((dates.startDate ? dates.startDate : new Date(new Date().getFullYear(), 0, 1)));
                        setEndDate((dates.endDate ? dates.endDate : new Date()));
                    }}
                />
            </div>
            <ProdutosConvenioTable tableData={tableData} />
        </div>
    );
}