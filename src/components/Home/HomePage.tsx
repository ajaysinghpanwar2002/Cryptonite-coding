'use client'

import React, { useEffect, useCallback } from 'react';
import LineChart from "../chart/LineChart";
import { fetchCoinGeckoData } from "../fetchCoinGeckoData";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { setData, setLastFetchTime } from '../../lib/store/features/coinMarketData/coinMarketDataSlice';

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

    const dispatch = useAppDispatch();
    const { data, lastFetchTime } = useAppSelector(state => state.coinMarketData);

    const fetchData = useCallback(async () => {
        try {
            const tempData: CoinMarketData[] = [];
            for (const coin of coinNames) {
                const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=${currency}&from=${previousYearUnixTimestamp}&to=${currentUnixTimestamp}`;
                const coinData = await fetchCoinGeckoData(url);
                if (coinData && coinData['market_caps']) {
                    tempData.push(coinData);
                } else {
                    throw new Error(`Failed to fetch data for ${coin}`);
                }
            }
            dispatch(setData(tempData));
            dispatch(setLastFetchTime(Date.now()));
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, [coinNames, currency, currentUnixTimestamp, previousYearUnixTimestamp, dispatch]);

    useEffect(() => {
        const now = Date.now();
        if (now - lastFetchTime > 3600000 || data.length === 0) { // 1 hour in milliseconds
            fetchData();
        }

        const intervalId = setInterval(fetchData, 3600000); // Fetch data every hour

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [lastFetchTime, data.length, fetchData]);

    if (data.length === 0) return <div>Loading...</div>;

    return (
        <div>
            <h1>Line Chart Example</h1>
            <div>
                <LineChart data={data.map(d => d.prices)} coinNames={coinNames} />
            </div>
        </div>
    );
}

export default HomePage;
