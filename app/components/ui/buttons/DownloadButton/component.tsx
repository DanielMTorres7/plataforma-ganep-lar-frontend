import React, { useMemo } from 'react';
import './styles.css';

interface DownloadButtonProps {
    onClick?: () => void;
    body?: object;
    fileName: string;
    endpoint: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ body, endpoint, fileName, onClick }) => {
    const token = localStorage.getItem('token');
    const memoizedBody = useMemo(() => body, [JSON.stringify(body)]);
    const handleDownload = async () => {
        try {
            const response = await fetch(`https://whatsapp.dstorres.com.br:5000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memoizedBody),
            });
            if (!response.ok) {
                throw new Error('Erro ao baixar o arquivo');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <button className='download_button' onClick={handleDownload}>
            Baixar Arquivo XLSX
        </button>
    );
};

export default DownloadButton;