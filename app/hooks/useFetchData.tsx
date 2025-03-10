import { useState, useCallback, useEffect, useMemo } from 'react';

interface FetchDataOptions<T> {
    endpoint: string;
    body?: object;
    defaultData?: T;
}

const useFetchData = <T,>({ endpoint, body, defaultData }: FetchDataOptions<T>) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>(defaultData as T);

    // Memoiza o body para evitar recriação desnecessária
    const memoizedBody = useMemo(() => body, [JSON.stringify(body)]);

    const fetchProtectedData = useCallback(async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        try {
            const response = await fetch(`https://whatsapp.dstorres.com.br:5000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memoizedBody),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Resposta da API:', responseData);
                setData(responseData as T);
            } else {
                console.error('Erro ao acessar rota protegida');
            }
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    }, [endpoint, memoizedBody]); // Dependências do useCallback

    useEffect(() => {
        if (!memoizedBody) return; // Não faz fetch se o body for undefined
        setLoading(true);
        fetchProtectedData();
    }, [fetchProtectedData, memoizedBody]); // Dependências do useEffect

    return { data, loading };
};

export default useFetchData;