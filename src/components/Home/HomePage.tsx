'use client';

import React, { useEffect, useState } from 'react';
import LineChart from '../chart/LineChart';
import { useCoinData } from '../../hooks/useCoinData';
import { useTheme } from 'next-themes';
import LineChartShimmer from '../shimmer/LineChartShimmer';
import { useAppSelector } from '@/lib/store/store';

const currency = 'inr';
const defaultCoinIds = ['bitcoin', 'ethereum', 'dogecoin'];

function HomePage({ FirstReloadConstantDataForThreeCoins }: { FirstReloadConstantDataForThreeCoins: any }) {
    const coinIdsFromSlice = useAppSelector((state) => state.coinsTableB.coins.map((coin) => coin.id));
    const [coinIds, setCoinIds] = useState<string[]>(defaultCoinIds);
    const [data, setData] = useState(FirstReloadConstantDataForThreeCoins);

    useEffect(() => {
        if (coinIdsFromSlice.length === 0) {
            setCoinIds(defaultCoinIds);
            setData(FirstReloadConstantDataForThreeCoins);
        } else if (coinIdsFromSlice.toString() !== coinIds.toString()) {
            setCoinIds(coinIdsFromSlice);
        }
    }, [coinIdsFromSlice, FirstReloadConstantDataForThreeCoins]);

    const fetchedData = useCoinData(coinIds, currency);

    // This effect updates data based on fetchedData
    useEffect(() => {
        if (coinIdsFromSlice.length > 0 && JSON.stringify(fetchedData) !== JSON.stringify(data)) {
            setData(fetchedData);
        }
    }, [fetchedData, coinIdsFromSlice, data]);

    const { theme } = useTheme();

    return (
        <div>
            <h1 className="text-3xl font-medium mb-8">Global Market Cap</h1>
            <div>
                {data.length === 0 ? (
                    <LineChartShimmer theme={theme || ''} />
                ) : (
                    <LineChart data={data.map((d: { market_caps: any }) => d.market_caps)} coinNames={coinIds} />
                )}
            </div>
        </div>
    );
}

export default HomePage;
