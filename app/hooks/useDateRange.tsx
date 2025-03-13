import { useEffect, useState } from "react";

interface DateRange {
    startDate: Date;
    endDate: Date;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
}

interface UseDateRangeOptions {
    config_startDate?: Date;
    config_endDate?: Date;
    config_sessionStorage_key?: string;
}

export const useDateRange = (options?: UseDateRangeOptions): DateRange => {
    let { config_startDate, config_endDate, config_sessionStorage_key } = options || {};

    config_startDate = config_startDate ?? new Date(Date.UTC(new Date().getFullYear(), 0, 1));
    config_endDate = config_endDate ?? new Date();
    config_sessionStorage_key = config_sessionStorage_key ?? 'date_range';

    const startKey = config_sessionStorage_key + '_start';
    const endKey = config_sessionStorage_key + '_end';
    
    
    // Inicializa as datas com valores do sessionStorage ou valores padrão
    const [startDate, setStartDate] = useState<Date>(() => {
        if (typeof window !== 'undefined') { // Verifica se está no navegador
            const storedStartDate = sessionStorage.getItem(startKey);
            return storedStartDate ? new Date(storedStartDate) : config_startDate;
        }
        return config_startDate; // Valor padrão para SSR
    });

    const [endDate, setEndDate] = useState<Date>(() => {
        if (typeof window !== 'undefined') { // Verifica se está no navegador
            const storedEndDate = sessionStorage.getItem(endKey);
            return storedEndDate ? new Date(storedEndDate) : config_endDate;
        }
        return config_endDate; // Valor padrão para SSR
    });

    // Salva as datas no sessionStorage sempre que mudam
    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(startKey, startDate.toISOString());
            sessionStorage.setItem(endKey, endDate.toISOString());
        }
    }, [startDate, endDate]);

    return { startDate, endDate, setStartDate, setEndDate };
};