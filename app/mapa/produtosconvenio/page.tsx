'use client';

import { useState, useEffect } from 'react';
import '@/app/components/css/table.css';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, SortingState, ColumnFiltersState } from "@tanstack/react-table";
import './styles.css';
import InfoCellCompoent from '../components/InfoCellCompoent';

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

async function fetchOrcamentos(): Promise<ProdutosConvenio[]> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    try {
        const response = await fetch('https://whatsapp.dstorres.com.br:5000/produtosconvenio', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data.operadoras as ProdutosConvenio[];
        } else {
            console.error('Erro ao acessar rota protegida');
            return [];
        }
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
};

export default function OrcamentosPage() {
    const [data, setData] = useState<ProdutosConvenio[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    useEffect(() => {
        fetchOrcamentos()
            .then((data) => {
                setData(data); // Atualiza o estado com os dados recebidos
            })
            .catch((err) => {
                console.error(err); // Trata erros
            });
    }, []);

    // Transformar os dados para o formato esperado pela tabela
    const tableData = data.map((operadora) => {
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
    

    // Definir as colunas da tabela
    const columns: ColumnDef<any>[] = [
        {
            header: 'Operadora',
            accessorKey: 'operadora',
        },
        {
            header: 'Produto',
            accessorKey: 'produto',
        },
        ...Array.from({ length: 31 }, (_, i) => ({
            header: `${i + 1}`,
            accessorKey: `${i + 1}`,
        })),
        {
            header: 'Média',
            accessorKey: 'media',
        },
    ];


    const table = useReactTable({
        data: tableData,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (data.length === 0) {
        return <div>Carregando...</div>;
    }

    return (
        <div className='holder'>
            <table className='custom-table'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell, cellIndex) => {

                                if (cell.column.columnDef.header && 
                                    cell.column.columnDef.header === 'Operadora' || 
                                    cell.column.columnDef.header === 'Produto' ||
                                    cell.column.columnDef.header === 'Média'
                                ) {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                }
                                
                                const prevCellValue = row.getVisibleCells()[cellIndex - 1].getValue() && ((row.getVisibleCells()[cellIndex - 1].getValue()) as Diario).total;
                                const currentCellValue = (cell.getValue() as Diario);
                                if (!(currentCellValue && currentCellValue.total)) {
                                    return (
                                        <td key={cell.id}></td>
                                    );
                                }
                                const currentTotal = currentCellValue && currentCellValue.total;
                                let className = '';

                                if (typeof currentTotal === 'number' && typeof prevCellValue === 'number') {
                                    if (currentTotal > prevCellValue) {
                                        className = 'greater';
                                        return (
                                            <td key={cell.id} className={className}>
                                                <InfoCellCompoent
                                                    value={currentCellValue.total.toString()}
                                                    entradas={currentCellValue.entradas}
                                                    saidas={currentCellValue.saidas}
                                                />
                                            </td>
                                        );
                                    } else if (currentTotal < prevCellValue) {
                                        className = 'lesser';
                                        return (
                                            <td key={cell.id} className={className}>
                                                <InfoCellCompoent
                                                    value={currentCellValue.total.toString()}
                                                    entradas={currentCellValue.entradas}
                                                    saidas={currentCellValue.saidas}
                                                />
                                            </td>
                                        );
                                    }
                                    
                                }
                                return (
                                    <td key={cell.id} className={className}>
                                        {currentCellValue.total}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}