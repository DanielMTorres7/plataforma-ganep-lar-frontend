import React from 'react';
import './styles.css';

interface InfoShowerProps {
    text: string | number | React.ReactNode;
    value: string | number | React.ReactNode;
    className?: string;
}

const InfoShower: React.FC<InfoShowerProps> = ({ text, value, className }) => {
    return (
        <div className={"info-shower " + className}>
            <div className="info-shower-value">{value}</div>
            <div className="info-shower-text">{text}</div>
        </div>  
    );
};

export default InfoShower;