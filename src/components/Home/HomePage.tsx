'use client'

import React, { useEffect, useCallback } from 'react';
import LineChart from "../chart/LineChart";
import { fetchCoinGeckoData } from "../utils/fetchCoinGeckoData";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { setData, setLastFetchTime } from '../../lib/store/features/coinMarketData/coinMarketDataSlice';
import { useTheme } from 'next-themes';

export interface CoinMarketData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

interface FetchError {
    message: string;
}

function HomePage() {
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    const oneYearInSeconds = 31536000;
    const previousYearUnixTimestamp = currentUnixTimestamp - oneYearInSeconds;
    const currency = 'inr';
    const coinNames = ['bitcoin', 'ethereum', 'dogecoin'];
    const { theme } = useTheme();

    const dispatch = useAppDispatch();
    const { data, lastFetchTime } = useAppSelector(state => state.coinMarketData);

    const fetchData = useCallback(async () => {
        try {
            const tempData: CoinMarketData[] = [];
            for (const coin of coinNames) {
                const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=${currency}&from=${previousYearUnixTimestamp}&to=${currentUnixTimestamp}`;
                // const coinData = []
                const coinData = await fetchCoinGeckoData(url);
                if (coinData && coinData['market_caps']) {
                    tempData.push(coinData);
                } else {
                    throw new Error(`Failed to fetch data for ${coin}`);
                }
            }
            console.log('data for chart:', tempData);
            dispatch(setData(tempData));
            dispatch(setLastFetchTime(Date.now()));
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, [coinNames, dispatch]);

    useEffect(() => {
        const now = Date.now();
        if (now - lastFetchTime > 3600000 || data.length === 0) { // 1 hour in milliseconds
            fetchData();
        }

        const intervalId = setInterval(fetchData, 3600000); // Fetch data every hour

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [lastFetchTime, data.length, fetchData]);

    const ShimmerEffect = () => (
        <div className={`w-full h-96 overflow-hidden relative rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}>
            <div className="shimmer h-full"></div>
        </div>
    );

    if (data.length === 0) return <ShimmerEffect />

    console.log('data from redux :', data);

    return (
        <div>
            <h1 className="text-3xl font-medium mb-8">Global Market Cap</h1>
            <div>
                <LineChart data={data.map(d => d.market_caps)} coinNames={coinNames} />
            </div>
        </div>
    );
}

export default HomePage;
