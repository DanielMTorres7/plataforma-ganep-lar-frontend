import CustomModal from "@/app/components/ui/CustomModal/component";
import SingleGauge from "@/app/components/ui/DoughnutChart/component";
import { atendimento } from "../../interfaces/atendimento";
import CustomTableComponent from "@/app/components/ui/CustomTable/component";


interface AtendimentosInfoShowerProps {
    atendimentos: atendimento[];
    label: string;
    title: string;
    max: number;
}


export default function AtendimentosInfoShower({ atendimentos, label, title, max }: AtendimentosInfoShowerProps) {
    return (
        <CustomModal
            opener={
                <div>
                    <SingleGauge
                        label={label}
                        title={title}
                        value={atendimentos.length}
                        max={max}
                    />
                </div>
            }
            size="large"
        >
            <CustomTableComponent
                style={{ maxHeight: '500px' }}
                columns={
                    [
                        {
                            header: 'Prontuário',
                            accessorKey: 'PRONTUARIO',
                            cell: info => <>{info.getValue() as number}</>,
                        },
                        {
                            header: 'Atendimento',
                            accessorKey: 'ATENDIMENTO',
                            cell: info => <span>{info.getValue() as number}</span>,
                        },
                        {
                            header: 'Paciente',
                            accessorKey: 'PACIENTE',
                            cell: info => <span>{info.getValue() as string}</span>,
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
                            header: 'Operadora',
                            accessorKey: 'OPERADORA',
                            cell: info => <span>{info.getValue() as string}</span>,
                        },
                        {
                            header: 'Grupo',
                            accessorKey: 'GRUPO',
                            cell: info => <span>{info.getValue() as string}</span>,
                        },
                        {
                            header: 'Status',
                            accessorKey: 'STATUS',
                            cell: info => <span>{info.getValue() as string}</span>,
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
                            header: 'Risco Nutri',
                            accessorKey: 'RISCO_NUTRI',
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
                            cell: info => <>{info.getValue() as boolean ? 'Sim' : 'Não'}</>,
                        },
                        {
                            header: 'Diabetes',
                            accessorKey: 'DIABETES',
                            cell: info => <>{info.getValue() as boolean ? 'Sim' : 'Não'}</>,
                        },
                    ]
                }
                data={atendimentos}
            />
        </CustomModal>
    );
}