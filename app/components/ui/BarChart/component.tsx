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
import { on } from "events";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

interface BarChartProps {
    labels: string[];
    datasets: ChartDataset[];
    title?: string;
    options?: ChartOptions;
    onClick?: (e: any) => void;
}

export default function BarChart({ labels, datasets, title, options, onClick }: BarChartProps) {
    let defaultOptions = {
        onClick: function(e: any) {
            if (onClick) {
                const chart = e.chart;
                const elements = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
                const datasetIndex = elements[0].datasetIndex;
                const index = elements[0].index;
                onClick({ datasetIndex, index });
            }
        },
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
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            }
        },
    };

    const bgColors = [
        {backgroundColor: 'rgba(35, 117, 241, 0.2)', borderColor: 'rgba(35, 117, 241, 0.6)'},
        {backgroundColor: 'rgba(241, 35, 131, 0.2)', borderColor: 'rgba(241, 35, 131, 0.6)'},
        {backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 0.6)'},
        {backgroundColor: 'rgba(192, 75, 192, 0.2)', borderColor: 'rgba(192, 75, 192, 0.6)'},
        {backgroundColor: 'rgba(192, 192, 75, 0.2)', borderColor: 'rgba(192, 192, 75, 0.6)'},
        {backgroundColor: 'rgba(192, 75, 75, 0.2)', borderColor: 'rgba(192, 75, 75, 0.6)'},
        {backgroundColor: 'rgba(75, 192, 75, 0.2)', borderColor: 'rgba(75, 192, 75, 0.6)'},

    ];

    const configedDatasets = datasets.map((dataset:any, index) => {
        if (dataset.yAxisID === 'yAxis') {
            if (!(defaultOptions.scales as any).yAxis) {
                (defaultOptions.scales as any).yAxis = {
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                };
            }
        }
        if (dataset.type === 'line') {
            return {
                ...dataset,
                tension: 0.2,
                pointStyle: 'circle',
                pointRadius: 2,
                borderColor: bgColors[index % bgColors.length].borderColor,
            };
        } else if (dataset.type === 'bar' || !dataset.type) {
            return {
                ...dataset,
                backgroundColor: bgColors[index % bgColors.length].backgroundColor,
                borderColor: bgColors[index % bgColors.length].borderColor,
                borderWidth: 2.5,
                borderRadius: 10,
            };
        }

        return { ...dataset };
    });

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
                    datasets: configedDatasets,
                    labels: labels,
                }
            }
            options={mergedOptions}
            
        />
    );
}