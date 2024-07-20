'use client';

import React, { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/components/utils/fetchCoinGeckoData';
import LineChart from '@/components/chart/LineChart';

interface CoinMarketData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

function Page({ params }) {
    const [productDetails, setProductDetails] = useState<CoinMarketData[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const currency = 'inr';
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);

    const oneYearInSeconds = 31536000;
    const previousYearUnixTimestamp = currentUnixTimestamp - oneYearInSeconds;

    const coinName = [`${params.id}`];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const data = await fetchCoinGeckoData(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart/range?vs_currency=${currency}&from=${previousYearUnixTimestamp}&to=${currentUnixTimestamp}`);
                setProductDetails([data]); // Wrap data in an array to match the expected structure
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setIsLoading(false); // End loading
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <div className="">
            {isLoading ? ( 
                <div>Loading...</div> 
            ) : (
                <>
                    product page for {params.id}
                    {productDetails.length > 0 && (
                        <LineChart data={productDetails.map(d => d.market_caps)} coinNames={coinName} />
                    )}
                </>
            )}
        </div>
    );
}

export default Page;
