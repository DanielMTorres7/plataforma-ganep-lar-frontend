'use client';

import { useState, useEffect } from 'react';
import '@/app/components/css/table.css';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, SortingState, ColumnFiltersState } from "@tanstack/react-table";
import './styles.css';
import useFetchData from '@/app/hooks/useFetchData';
import { useDateRange } from '@/app/hooks/useDateRange';
import DatePickerComponent from '@/app/components/ui/DatePicker/component';

import '@/app/components/css/table.css';

interface ProdutosConvenio {
    ENTRADA: string;
    ALTA: string;
    PREVISAO_ALTA: string;
    DATA_REGISTRO: string;
    DATA_AVALIACAO: string;
    DATA_ORCAMENTO: string;
    DATA_REPROVADO: string;
    NASCIMENTO: string;
}

export default function OrcamentosPage() {
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange({
        // mes atual
        config_startDate: new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), 2)),
        config_endDate: new Date(),
        config_sessionStorage_key: 'datasets_data',
    }); // Estado para datas

    const { data: data, loading } = useFetchData<ProdutosConvenio[]>({
        endpoint: 'datasets/atendimento_completo',
        body: {}, 
        defaultData: [],
        
    });
    
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
            <div className='table_holder'>
                {data ? (
                    <table className='custom-table'>
                        <thead>
                            <tr>
                                {
                                    data[0] && Object.keys(data[0]).map((key, index) => (
                                        <th key={index}>{key}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row:any, index) => (
                                <tr key={index}>
                                    {
                                        Object.keys(row).map((key:any, index) => (
                                            <td key={index}>{row[key]}</td>
                                        ))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Nenhum dado encontrado</div>
                )
                }
            </div>
            
        </div>
    );
}