import React from 'react';
import './styles.css';
import { atendimento } from '../../interfaces/Atendimento';
import CustomModal from '@/app/components/ui/CustomModal/component';
import AtendimentosTableComponent from '../AtendimentoTable/component';

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
            <AtendimentosTableComponent atendimentos={atendimentos} />
        </CustomModal>
        
        
    );
};

export default AtendimentosInfoShower;