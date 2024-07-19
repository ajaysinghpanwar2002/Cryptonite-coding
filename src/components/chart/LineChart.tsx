'use client'

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

const LineChart = ({ data, coinNames }) => {
    const labels = data[0].map((entry) => {
        if (!Array.isArray(entry) || entry.length < 2) {
            console.error("Invalid entry format: each entry should be an array with at least two elements.");
            return "Invalid date";
        }
        return new Date(entry[0] * 1000).toLocaleDateString();
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
    }));

    const chartData = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Market Cap Prices',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;