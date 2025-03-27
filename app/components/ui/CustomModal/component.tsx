'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // Certifique-se de criar um arquivo CSS para estilizar o modal

interface CustomModalProps {
    size?: 'small' | 'medium' | 'large';
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
    opener: React.ReactElement<{ onClick?: () => void; style?: React.CSSProperties }>; // Explicitly typing opener props
    trigger?: boolean; // Adicionado para forçar a reabertura do modal
    onClose?: () => void;
    onOpen?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ size = 'medium', children, className, style, opener, trigger, onClose, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        if (onOpen) {
            onOpen(); // Notifica o componente pai que o modal foi aberto
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) {
            onClose(); // Notifica o componente pai que o modal foi fechado
        }
    };

    const handleOutsideClick = (e: React.MouseEvent) => {
        if ((e.target as Element).classList.contains('modal-overlay')) {
            handleClose();
        }
    };

    useEffect(() => {
        // Marcar o componente como montado após a renderização no cliente
        setIsMounted(true);

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    useEffect(() => {
        if (trigger) {
            setIsOpen(true);
        }
    }, [trigger]);

    // Evitar renderização do portal durante a SSR
    if (!isMounted) {
        return null;
    }

    // Clonar o opener e adicionar o evento onClick e adicionar ao style para o cursor pointer
    // Caso tenha um opener caso contrário, não renderizar nada

    
    const openerWithClick = opener && 
    opener.type !== React.Fragment && 
    React.isValidElement(opener) 
        ? React.cloneElement(opener, {
            onClick: handleOpen,
            style: { ...(opener.props?.style || {}), cursor: 'pointer' },
        }) 
        : null;

    return (
        <>
            {/* Renderizar o opener com o evento de clique adicionado */}
            {openerWithClick}

            {isOpen &&
                ReactDOM.createPortal(
                    <div className={"modal-overlay " + className} style={style} onClick={handleOutsideClick}>
                        <div className={`modal-content ${size}`}>
                            <button className="modal-close" onClick={handleClose}>
                                &times;
                            </button>
                            {children}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default CustomModal;