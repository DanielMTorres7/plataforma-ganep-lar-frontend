import React from 'react';
import './styles.css';
import CustomModal from '@/app/components/ui/CustomModal/component';
import { atendimento } from '../../interfaces';
import CustomTableComponent from '@/app/components/ui/CustomTable/component';

interface InfoShowerProps {
    text: string | number | React.ReactNode;
    value: string | number | React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    atendimentos: atendimento[];
}

const DispositivosInfoShower: React.FC<InfoShowerProps> = ({ text, value, className, style, atendimentos }) => {
    return (
        <CustomModal
            size="large"
            opener={
                <div className={"info-shower " + className} style={style}>
                    <div className="info-shower-value">{value}</div>
                    <div className="info-shower-text">{text}</div>
                </div>
            }
        >
            <h1>{text}</h1>
            <CustomTableComponent
                style={{ maxHeight: '500px' }}
                columns={
                    [
                        {
                            header: 'Prontuário',
                            accessorKey: 'PRONTUARIO',
                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as number}</span>,
                        },
                        {
                            header: 'Atd.',
                            accessorKey: 'ATENDIMENTO',
                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as number}</span>,
                        },
                        {
                            header: 'Paciente',
                            accessorKey: 'PACIENTE',
                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                        },
                        {
                            header: 'Operadora',
                            accessorKey: 'OPERADORA',
                            cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                        },
                        {
                            header: 'Entrada',
                            accessorKey: 'ENTRADA',
                            cell: info => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
                            sortingFn: (a, b) => {
                                return new Date(a.original.ENTRADA).getTime() - new Date(b.original.ENTRADA).getTime();
                            },
                        },
                        {
                            header: 'Status',
                            accessorKey: 'STATUS',
                            cell: info => <span>{info.getValue() as string}</span>,
                        },
                        {
                            header: 'Data Alta',
                            accessorKey: 'ALTA',
                            cell: info => <span>{info.getValue() && new Date(info.getValue() as string).toLocaleDateString()}</span>,
                            sortingFn: (a, b) => {
                                return new Date(a.original.ALTA).getTime() - new Date(b.original.ALTA).getTime();
                            },
                        },
                        {
                            header: 'CVA',
                            accessorKey: 'CVA',
                            cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
                        },
                        {
                            header: 'CVD',
                            accessorKey: 'CVD',
                            cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
                        },
                        {
                            header: 'GTT',
                            accessorKey: 'GTT',
                            cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
                        },
                        {
                            header: 'SNE',
                            accessorKey: 'SNE',
                            cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
                        },
                        {
                            header: 'TQT',
                            accessorKey: 'TQT',
                            cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
                        },
                        {
                            header: 'PICC',
                            accessorKey: 'PICC',
                            cell: info => <span>{info.getValue() as boolean ? 'Sim' : 'Não'}</span>,
                        },
                        
                    ]
                }    
                data={atendimentos}
            />
        </CustomModal>
        
        
    );
};

export default DispositivosInfoShower;