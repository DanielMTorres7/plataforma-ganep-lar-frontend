import React from 'react';
import './styles.css';
import { atendimento } from '../../interfaces/Atendimento';
import CustomModal from '@/app/components/ui/CustomModal/component';
import CustomTableComponent from '@/app/components/ui/CustomTable/component';

interface InfoShowerProps {
    text: string | number | React.ReactNode;
    value: string | number | React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    atendimentos: atendimento[];
}

const AtendimentosInfoShower: React.FC<InfoShowerProps> = ({ text, value, className, style, atendimentos }) => {
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
                columns={[
                    {
                        header: 'Paciente',
                        accessorKey: 'PACIENTE',
                        cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                    },
                    {
                        header: 'Data Alta',
                        accessorKey: 'ALTA',
                        cell: info => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
                        sortingFn: (a, b) => {
                            return new Date(a.original.ALTA).getTime() - new Date(b.original.ALTA).getTime();
                        },
                    },
                    {
                        header: 'Operadora',
                        accessorKey: 'OPERADORA',
                        cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                    },
                    {
                        header: 'Atendimento',
                        accessorKey: 'ATENDIMENTO',
                        cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                    },
                    {
                        header: 'Prontuário',
                        accessorKey: 'PRONTUARIO',
                        cell: info => <span>{String(info.getValue() as string).substring(0, 2)}**(Dado Protegido)</span>,
                            // cell: info => <span>{info.getValue() as string}</span>,
                    },
                ]}
                data={atendimentos}
                style={{ maxHeight: '500px' }}
            />
        </CustomModal>
        
        
    );
};

export default AtendimentosInfoShower;