import CustomModal from "@/app/components/ui/CustomModal/component";
import CustomTableComponent from "@/app/components/ui/CustomTable/component";

interface InfoCellCompoentProps {
    value: string;
    entradas?: object[];
    saidas?: object[];
    className?: string;
}

const InfoCellCompoent = (props: InfoCellCompoentProps) => {
    const { value, entradas, saidas, className } = props;

    return (
        <>
            <CustomModal 
                opener={
                    <span className={props.className} key={value}>{value}</span>
                }
            >
                <div>
                    {
                        // verificar se entradas é undefined ou null
                        entradas === undefined || entradas === null ?
                            <h1>Sem entradas</h1>
                            :
                            <>
                                <h2>Entradas</h2>
                                <CustomTableComponent
                                    columns={[
                                        {
                                            header: 'Prontuário',
                                            accessorKey: 'PRONTUARIO'
                                        },
                                        {
                                            header: 'Atd.',
                                            accessorKey: 'ATENDIMENTO'
                                        },
                                        {
                                            header: 'Paciente',
                                            accessorKey: 'PACIENTE',
                                            cell: info => <span>{String(info.getValue() as string).split(" ").map((n)=>{
                                                return n.charAt(0).toUpperCase();
                                            })}</span>
                                        },
                                        {
                                            header: 'Operadora',
                                            accessorKey: 'OPERADORA'
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
                                        ]
                                    }
                                    data={entradas!}
                                />
                            </>
                    }
                    {
                        // verificar se saidas é undefined ou null
                        saidas === undefined || saidas === null ?
                            <h1>Sem saídas</h1>
                            :
                            <>
                                <h2>Saídas</h2>
                                <CustomTableComponent
                                    columns={[
                                        {
                                            header: 'Prontuário',
                                            accessorKey: 'PRONTUARIO'
                                        },
                                        {
                                            header: 'Atd.',
                                            accessorKey: 'ATENDIMENTO'
                                        },
                                        {
                                            header: 'Paciente',
                                            accessorKey: 'PACIENTE',
                                            cell: info => <span>{String(info.getValue() as string).split(" ").map((n)=>{
                                                return n.charAt(0).toUpperCase();
                                            })}</span>
                                        },
                                        {
                                            header: 'Operadora',
                                            accessorKey: 'OPERADORA'
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
                                    ]}
                                    data={saidas!}
                                />
                            </>
                    }
                    
                </div>
            </CustomModal>     
        </>
    );
}

export default InfoCellCompoent;