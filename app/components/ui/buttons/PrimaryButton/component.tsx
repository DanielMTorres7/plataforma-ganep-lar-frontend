import React from 'react';
import './styles.css';

interface btnProps {
    text: string;
    onClick: () => void;
}

const PrimaryButton: React.FC<btnProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="btn_primary">{text}</button>
    );
};

export default PrimaryButton;