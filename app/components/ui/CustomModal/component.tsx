'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // Certifique-se de criar um arquivo CSS para estilizar o modal

interface CustomModalProps {
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
    opener: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ size = 'medium', children, opener }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
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

    // Evitar renderização do portal durante a SSR
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <div onClick={handleOpen} style={{ cursor: 'pointer', width: '100%', padding: '0', margin: '0', border: 'none', background: 'none' }}>
                {opener}
            </div>

            {isOpen &&
                ReactDOM.createPortal(
                    <div className="modal-overlay" onClick={handleOutsideClick}>
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