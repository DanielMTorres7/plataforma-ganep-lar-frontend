import { useEffect, useState } from "react";

interface DateRange {
    startDate: Date;
    endDate: Date;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
}

export const useDateRange = (): DateRange => {
    // Inicializa as datas com valores do sessionStorage ou valores padrão
    const [startDate, setStartDate] = useState<Date>(() => {
        if (typeof window !== 'undefined') { // Verifica se está no navegador
            const storedStartDate = sessionStorage.getItem('data_inicio');
            return storedStartDate ? new Date(storedStartDate) : new Date(Date.UTC(new Date().getFullYear(), 0, 1));
        }
        return new Date(Date.UTC(new Date().getFullYear(), 0, 1)); // Valor padrão para SSR
    });

    const [endDate, setEndDate] = useState<Date>(() => {
        if (typeof window !== 'undefined') { // Verifica se está no navegador
            const storedEndDate = sessionStorage.getItem('data_fim');
            return storedEndDate ? new Date(storedEndDate) : new Date();
        }
        return new Date(); // Valor padrão para SSR
    });

    // Salva as datas no sessionStorage sempre que mudam
    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('data_inicio', startDate.toISOString());
            sessionStorage.setItem('data_fim', endDate.toISOString());
        }
    }, [startDate, endDate]);

    return { startDate, endDate, setStartDate, setEndDate };
};