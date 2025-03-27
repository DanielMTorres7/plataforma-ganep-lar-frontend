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
  ChartOptions,
  ArcElement
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import './styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, annotationPlugin);

interface DoughnutChartProps {
    value: number;
    max: number;
    title?: string;
    options?: ChartOptions;
    circumference?: number; // Nova prop para controlar a circunferência
    label: string;
    width?: number;
}

export default function SingleGauge({ label, value, title, options, circumference, max, width }: DoughnutChartProps) {  
    width = width? width: 200;
    // tooltip deve ser value 
    const datasets: ChartDataset[] = [
        {
            label: label,
            data: [value, max - value],
            backgroundColor: [
                'rgba(241, 35, 131, 0.6)',
                '#E0E0E0',
            ],
            borderWidth: 0,
        },
    ];

    const defaultOptions = {
        circumference: circumference ? circumference : 180, // Define o tamanho do buraco no meio do doughnut
        rotation: -90,
        responsive: true,
        aspectRatio: 1.5,
        
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
            },
            annotation: {
                annotations: {
                    dLabel: {
                        type: 'doughnutLabel' as any,
                        content: () => [
                            `${Number(datasets[0].data[0])}`,
                        ],
                        font: [{size: width / 10}],
                        yAdjust: width / 12,
                    },
                }
            }
        },
    };

    // Mesclando as opções padrão com as opções personalizadas
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };

    return (
        <div className="doughnut-chart" style={{ width: width  }}>
            <Chart
                type="doughnut"
                data={
                    {
                        datasets: datasets,
                    }
                }
                options={mergedOptions}
            />
        </div>
    );
}