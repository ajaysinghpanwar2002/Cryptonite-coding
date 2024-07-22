'use client';

import React, { useEffect, useState } from 'react';
import { fetchCoinGeckoData } from '@/components/utils/fetchCoinGeckoData';
import LineChart from '@/components/chart/LineChart';
import GeneralInformation from '@/components/Product/GeneralInformation';
import MarketData from '@/components/Product/MarketData';
import { useTheme } from 'next-themes';
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { addCoin } from '@/lib/store/features/recentlyViewed/recentlyViewed';

interface CoinMarketData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

interface TimeRangeButtonsProps {
    timeRange: number;
    setTimeRange: (index: number) => void;
    timeLabels: string[];
}

// ShimmerEffect Component
const ShimmerEffect = () => {
    const { theme } = useTheme();
    return (
        <div className={`w-full h-96 overflow-hidden relative rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}>
            <div className="shimmer h-full"></div>
        </div>
    );
};

// DataTypeButtons Component
const DataTypeButtons = ({ dataType, setDataType }: { dataType: any; setDataType: any }) => {
    const { theme } = useTheme();
    return (
        <div className='flex justify-around w-3/6'>
            {['prices', 'market_caps', 'total_volumes'].map((type, index) => (
                <button
                    key={index}
                    onClick={() => setDataType(type)}
                    className={`rounded-xl px-4 py-1 border-2 ${theme === 'dark' ? 'border-gray-600' : 'border-slate-300'} ${dataType === type ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                >
                    {type.replace('_', ' ')}
                </button>
            ))}
        </div>
    );
};

// TimeRangeButtons Component
const TimeRangeButtons: React.FC<TimeRangeButtonsProps> = ({ timeRange, setTimeRange, timeLabels }) => {
    const { theme } = useTheme();
    return (
        <div className='flex justify-around w-3/6'>
            {timeLabels.map((label, index) => (
                <button
                    key={index}
                    onClick={() => setTimeRange(index)}
                    className={`rounded-xl px-4 py-1 border-2 ${theme === 'dark' ? 'border-gray-600' : 'border-slate-300'} ${index === timeRange ? (theme === 'dark' ? 'bg-gray-700' : 'bg-slate-100') : ''}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

const ShimmerProductDetails = () => {
    return (
        <div className='p-8'>
            <div className="p-6 max-w-full mx-auto bg-gray-800 rounded-xl shadow-md space-y-4 animate-pulse">
                <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                    <div className="flex-1">
                        <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-400 rounded w-full"></div>
                    <div className="h-4 bg-gray-400 rounded w-full"></div>
                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                    <div className="flex space-x-2">
                        <div className="h-6 bg-gray-400 rounded w-1/5"></div>
                        <div className="h-6 bg-gray-400 rounded w-1/5"></div>
                        <div className="h-6 bg-gray-400 rounded w-1/5"></div>
                        <div className="h-6 bg-gray-400 rounded w-1/5"></div>
                    </div>
                </div>
                <div className="h-4 bg-gray-400 rounded w-1/4"></div>
            </div>
        </div>
    );
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Queue management
let requestQueue: (() => void)[] = [];
let isRequestInProgress = false;

const processQueue = async () => {
    if (isRequestInProgress || requestQueue.length === 0) {
        return;
    }

    isRequestInProgress = true;
    const request = requestQueue.shift();
    if (request) {
        await request();
        await delay(3000);  // Delay of 1000 milliseconds (1 second) between requests
    }
    isRequestInProgress = false;
    processQueue();
};

const queueRequest = (request: () => Promise<any>) => {
    requestQueue.push(() => request().then(processQueue));
    processQueue();
};

const fetchCoinGeckoDataWithDelay = (url: string) => {
    return new Promise<any>((resolve, reject) => {
        const request = async () => {
            try {
                const data = await fetchCoinGeckoData(url);
                resolve(data);
            } catch (error: any) {
                if (error.message === 'Too Many Requests') {
                    queueRequest(request);
                } else {
                    reject(error);
                }
            }
        };
        queueRequest(request);
    });
};

// Main Page Component
function Page({ params }: { params: any }) {
    const [marketCapProduct, setMarketCapProduct] = useState<CoinMarketData[]>([]);
    const [productDetails, setProductDetails] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [marketCapLoading, setMarketCapLoading] = useState(true);
    const currency = 'inr';
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    const coinName = params.id;
    const timeRangesInSeconds = [86400, 604800, 2592000, 31536000, 94608000, 157680000]; // 1 day, 1 week, 1 month, 1 year, 3 years, 5 years in seconds
    const timeLabels = ['1d', '1w', '1m', '1y', '3y', '5y'];
    const [timeRange, setTimeRange] = useState(0);
    let calculateTimeRange = currentUnixTimestamp - timeRangesInSeconds[timeRange];
    const [dataType, setDataType] = useState<'prices' | 'market_caps' | 'total_volumes'>('market_caps');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProductDetails = async () => {
            dispatch(addCoin(params.id));
            try {
                const data = await fetchCoinGeckoDataWithDelay(`https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`);
                setProductDetails(data);
                setIsLoading(false);
            } catch (error:any) {
                console.error('Failed to fetch product details:', error);
                if (error.message !== 'Too Many Requests') {
                    setIsLoading(false);
                }
            }
        };

        const fetchMarketCapData = async () => {
            try {
                const data = await fetchCoinGeckoDataWithDelay(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart/range?vs_currency=${currency}&from=${calculateTimeRange}&to=${currentUnixTimestamp}`);
                setMarketCapProduct([data]);
                setMarketCapLoading(false);
            } catch (error:any) {
                console.error('Failed to fetch market cap data:', error);
                if (error.message !== 'Too Many Requests') {
                    setMarketCapLoading(false);
                }
            }
        };

        fetchProductDetails();
        delay(3000).then(fetchMarketCapData);
    }, [coinName, timeRange]);

    if (isLoading) return <ShimmerProductDetails />;
    // if (marketCapLoading) return <ShimmerEffect />;

    return (
        <div className='p-4'>
            <GeneralInformation data={productDetails} />
            <MarketData data={productDetails} />
            <div className="text-xl font-bold mb-4 p-4">Charts Section</div>
            <div className='flex justify-center'>
                <DataTypeButtons dataType={dataType} setDataType={setDataType} />
            </div>
            <div className='mt-5 p-4'>
                {marketCapLoading ? <ShimmerEffect /> : <LineChart data={marketCapProduct.map(d => d[dataType])} coinNames={[coinName]} />}
            </div>
            <div className='flex items-center justify-center mt-4'>
                <TimeRangeButtons timeRange={timeRange} setTimeRange={setTimeRange} timeLabels={timeLabels} />
            </div>
        </div>
    );
}

export default Page;
