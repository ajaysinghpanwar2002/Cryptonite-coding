'use client'

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { setData, setLastFetchTime } from '@/lib/store/features/coinMarketData/coinMarketDataSlice';
import { fetchCoinGeckoData } from '@/components/utils/fetchCoinGeckoData';
import { ONE_YEAR_IN_SECONDS, FETCH_INTERVAL_MS } from '../constants'

export const useCoinData = (coinNames: string[], currency: string) => {
    const dispatch = useAppDispatch();
    const { data, lastFetchTime } = useAppSelector(state => state.coinMarketData);

    const fetchData = useCallback(async () => {
        const currentUnixTimestamp = Math.floor(Date.now() / 1000);
        const previousYearUnixTimestamp = currentUnixTimestamp - ONE_YEAR_IN_SECONDS;

        try {
            const tempData: any = [];
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
    }, [coinNames, currency, dispatch]);

    useEffect(() => {
        const now = Date.now();
        if (now - lastFetchTime > FETCH_INTERVAL_MS || data.length === 0) {
            fetchData();
        }

        const intervalId = setInterval(() => {
            const now = Date.now();
            if (now - lastFetchTime > FETCH_INTERVAL_MS) {
                fetchData();
            }
        }, FETCH_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [lastFetchTime, data.length, fetchData]);

    return data;
};
