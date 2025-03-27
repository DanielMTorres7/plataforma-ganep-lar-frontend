'use client';

import { useState, useEffect } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, SortingState, ColumnFiltersState } from "@tanstack/react-table";
import './styles.css';
import InfoCellCompoent from '../components/InfoCellCompoent';
import useFetchData from '@/app/hooks/useFetchData';
import { useDateRange } from '@/app/hooks/useDateRange';
import DatePickerComponent from '@/app/components/ui/DatePicker/component';
import CustomTableComponent from '@/app/components/ui/CustomTable/component';

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
    const dias = tableData[0] && Object.keys(tableData[0]).filter(key => !['operadora', 'produto', 'media'].includes(key)) || [];
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
            <CustomTableComponent
                style={{ height: '700px' }}
                columns={
                    [
                        {
                            header: 'Operadora',
                            accessorKey: 'operadora',
                            enableSorting: true,
                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // 
                        },
                        {
                            header: 'Produto',
                            accessorKey: 'produto',
                            enableSorting: true,
                        },
                        ...dias.map((dia:any) => ({
                            header: dia,
                            accessorKey: dia,
                            enableSorting: true,
                            cell: (info: any) => {
                                const index = info.row.index;
                                const cellData = (tableData[index] as any)[info.column.id] as Diario;
                                const entradas = cellData.entradas || [];
                                const saidas = cellData.saidas || [];
                                let className = (entradas.length > 0 ? 'greater' : saidas.length > 0 ? 'lesser' : '') + ' td-number';
                                return (
                                    entradas.length > 0 || saidas.length > 0 ?
                                        <InfoCellCompoent
                                            value={cellData.total.toString()}
                                            entradas={cellData.entradas}
                                            saidas={cellData.saidas}
                                            className={className}
                                        />
                                    :
                                    <span className={className}>{cellData.total}</span>
                                );
                            },
                            sortingFn: (a: any, b: any) => {
                                const column = dia;
                                const cellDataA = (tableData[a.index] as any)[column] as Diario;
                                const cellDataB = (tableData[b.index] as any)[column] as Diario;
                                return cellDataA.total - cellDataB.total;
                            },
                        })),
                        {
                            header: 'Média',
                            accessorKey: 'media',
                            enableSorting: true,
                        },
                    ]
                }
                data={tableData}
            />
        </div>
    );
}

