'use client'

import React from 'react';
import LineChart from "../chart/LineChart";
import { useCoinData } from "../../hooks/useCoinData";
import { useTheme } from 'next-themes';
import LineChartShimmer from '../shimmer/LineChartShimmer';

const coinNames = ['bitcoin', 'ethereum', 'dogecoin'];
const currency = 'inr';

function HomePage() {
    const data = useCoinData(coinNames, currency);
    const { theme } = useTheme();

    return (
        <div>
            <h1 className="text-3xl font-medium mb-8">Global Market Cap</h1>
            <div>
                {data.length == 0 ? <LineChartShimmer theme={theme} /> : <LineChart data={data.map(d => d.market_caps)} coinNames={coinNames} />}
            </div>
        </div>
    );
}

export default HomePage;