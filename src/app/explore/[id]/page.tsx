'use client';

import React, { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/components/utils/fetchCoinGeckoData';
import LineChart from '@/components/chart/LineChart';
import GeneralInformation from '@/components/Product/GeneralInformation';
import MarketData from '@/components/Product/MarketData';
import { useTheme } from 'next-themes';


interface CoinMarketData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

function Page({ params }) {
    const [marketCapProduct, setMarketCapProduct] = useState<CoinMarketData[]>([]);
    const [productDetails, setProductDetails] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const currency = 'inr';
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    const coinName = params.id;
    const { theme } = useTheme();

    const timeRangesInSeconds = [86400, 604800, 2592000, 31536000, 94608000, 157680000]; // 1 day, 1 week, 1 month, 1 year, 3 years, 5 years in seconds
    const timeLabels = ['1d', '1w', '1m', '1y', '3y', '5y'];
    const [timeRange, setTimeRange] = useState(0);
    let calculateTimeRange = currentUnixTimestamp - timeRangesInSeconds[timeRange];

    const [dataType, setDataType] = useState<'prices' | 'market_caps' | 'total_volumes'>('market_caps');

    const ShimmerEffect = () => (
        <div className={`w-full h-96 overflow-hidden relative rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}>
            <div className="shimmer h-full"></div>
        </div>
    );

    
    const ShimmerProductDetails = () => {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="h-14 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const data = await fetchCoinGeckoData(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart/range?vs_currency=${currency}&from=${calculateTimeRange}&to=${currentUnixTimestamp}`);
                setMarketCapProduct([data]);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setIsLoading(false); // End loading
            }
        };

        fetchData();
    }, [coinName, timeRange]); // Add timeRange to the dependency array

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true); // Start loading
            try {
                const data = await fetchCoinGeckoData(`https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`);
                setProductDetails(data);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setIsLoading(false); // End loading
            }
        };

        fetchProductDetails();
    }, [coinName]);

    if (marketCapProduct.length === 0) return <ShimmerEffect />
    if (productDetails.length === 0) return <ShimmerProductDetails />


    return (
        <div className="">
            <div className='p-4'>
                <GeneralInformation data={productDetails} />

                <MarketData data={productDetails} />

                <div className="text-xl font-bold mb-4 p-4">
                    Charts Section
                </div>

                <div className='flex justify-center'>
                    <div className='flex justify-around w-3/6'>
                        {['prices', 'market_caps', 'total_volumes'].map((type, index) => (
                            <button key={index} onClick={() => setDataType(type)} className={`rounded-xl px-4 py-1 border-2 border-slate-300 ${dataType === type ? 'bg-gray-500' : ''}`}>
                                {type.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='mt-5 p-4'>
                    {marketCapProduct.length > 0 &&
                        (
                            <LineChart data={marketCapProduct.map(d => d[dataType])} coinNames={[coinName]} />
                        )}
                </div>

                <div className='flex items-center justify-center mt-4'>
                    <div className='flex justify-around w-3/6 '>
                        {timeLabels.map((label, index) => (
                            <button key={index} onClick={() => setTimeRange(index)} className='rounded-xl px-4 py-1 border-2 border-slate-300'>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
