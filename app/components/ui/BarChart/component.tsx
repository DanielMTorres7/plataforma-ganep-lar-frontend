'use client';

import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
  PointElement,
  LineElement,
  ChartOptions
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

interface BarChartProps {
    labels: string[];
    datasets: ChartDataset[];
    title?: string;
    options?: ChartOptions;
}

export default function BarChart({ labels, datasets, title, options }: BarChartProps) {
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: !!title, // Exibe o título apenas se ele existir
                text: title,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                position: 'left', // Eixo y principal à esquerda
            },
        },
    };

    // Mesclando as opções padrão com as opções personalizadas
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        scales: {
            ...defaultOptions.scales,
            ...options?.scales, // Mesclando as escalas personalizadas, se existirem
        },
    };
    return (
        <Chart
            type="bar"
            data={
                {
                    datasets: datasets,
                    labels: labels,
                }
            }
            options={mergedOptions}
            
        />
    );
}