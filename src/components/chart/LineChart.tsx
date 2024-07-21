import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    data: number[][][];
    coinNames: string[];
}

const LineChart: React.FC<LineChartProps> = ({ data, coinNames }) => {
    const labels = data[0]?.map((entry) => {
        if (!Array.isArray(entry) || entry.length < 2) {
            console.error("Invalid entry format: each entry should be an array with at least two elements.");
            return "Invalid date";
        }
        return new Date(entry[0] * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    });

    const datasets = data.map((coinData, index) => ({
        label: `${coinNames[index]}`,
        data: coinData.map((entry) => {
            if (!Array.isArray(entry) || entry.length < 2) {
                console.error("Invalid entry format: each entry should be an array with at least two elements.");
                return 0;
            }
            return entry[1];
        }),
        borderColor: `rgba(${75 + index * 50}, 192, 192, 1)`,
        backgroundColor: `rgba(${75 + index * 50}, 192, 192, 0.2)`,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointStyle: 'circle',
    }));

    const chartData = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    usePointStyle: true,
                    padding: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context:any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumFractionDigits: 2,
                            }).format(context.parsed.y * 1e7); // Convert crores to actual value
                        }
                        return label;
                    }
                },
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                    size: 16,
                    family: 'Arial, sans-serif',
                },
                bodyFont: {
                    size: 14,
                    family: 'Arial, sans-serif',
                },
                cornerRadius: 5,
                caretSize: 6,
                xPadding: 10,
                yPadding: 10,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        family: 'Arial, sans-serif',
                    },
                    color: '#666',
                },
            },
            y: {
                grid: {
                    color: '#eee',
                },
                ticks: {
                    font: {
                        size: 12,
                        family: 'Arial, sans-serif',
                    },
                    color: '#666',
                    callback: function (value:any) {
                        return new Intl.NumberFormat('en-IN', {
                            maximumFractionDigits: 2,
                        }).format(value) + ' Cr'; // Format with commas and append 'Cr'
                    },
                    beginAtZero: true,
                },
                title: {
                    display: true,
                    text: 'Value in Crores',
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                },
            },
        },
    };

    return (
        <div className="relative w-full h-96">
            <Line data={chartData} options={options as any} />
        </div>
    );
};

export default LineChart;
