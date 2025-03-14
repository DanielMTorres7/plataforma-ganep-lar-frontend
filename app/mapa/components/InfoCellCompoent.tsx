import CustomModal from "@/app/components/ui/CustomModal/component";

interface InfoCellCompoentProps {
    value: string;
    entradas?: string[];
    saidas?: string[];
    className?: string;
}

const InfoCellCompoent = (props: InfoCellCompoentProps) => {
    const { value, entradas, saidas } = props;

    return (
        <>
            <CustomModal 
                opener={
                    <span className={props.className} key={value}>{value}</span>
                }
            >
                <div>
                    <h2>Entradas</h2>
                    <ul>
                        {entradas?.map((entrada, index) => (
                            <li key={index}>{entrada}</li>
                        ))}
                    </ul>
                    <h2>Saídas</h2>
                    <ul>
                        {saidas?.map((saida, index) => (
                            <li key={index}>{saida}</li>
                        ))}
                    </ul>
                </div>
            </CustomModal>     
        </>
    );
}

export default InfoCellCompoent;