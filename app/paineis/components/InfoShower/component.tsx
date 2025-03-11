import React from 'react';
import './styles.css';

interface InfoShowerProps {
    text: string | number | React.ReactNode;
    value: string | number | React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const InfoShower: React.FC<InfoShowerProps> = ({ text, value, className, style }) => {
    return (
        <div className={"info-shower " + className} style={style}>
            <div className="info-shower-value">{value}</div>
            <div className="info-shower-text">{text}</div>
        </div>  
    );
};

export default InfoShower;