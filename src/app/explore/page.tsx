'use client'

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import ExploreTable from '@/components/Explore/ExploreTable';
import { setCoinsA } from '@/lib/store/features/dragable/coinsTableA';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FirstReloadConstantDataForExploreCoinsPage } from '@/constants';

// ExploreTableShimmer Component
function ExploreTableShimmer() {
    return (
        <div className="space-y-4 p-8">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-300 rounded"></div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="h-4 bg-gray-300 rounded col-span-2"></div>
                                <div className="h-4 bg-gray-300 rounded col-span-1"></div>
                            </div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Pagination Component
function Pagination({ pageNo, setPageNo }: { pageNo: number, setPageNo: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <div className="flex justify-around m-10">
            <button
                onClick={() => setPageNo(prevPageNo => Math.max(prevPageNo - 1, 1))}
                disabled={pageNo === 1}
                className={`flex items-center ${pageNo === 1 ? 'text-gray-400' : 'text-blue-500'}`}
            >
                <FaArrowLeft className="mr-2" /> Previous
            </button>
            <button
                onClick={() => setPageNo(prevPageNo => prevPageNo + 1)}
                className="flex items-center text-blue-500"
            >
                Next <FaArrowRight className="ml-2" />
            </button>
        </div>
    );
}

// Main Page Component
function Page() {
    const [pageNo, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [lastFetchTime, setLastFetchTime] = useState(Date.now());
    const dispatch = useAppDispatch();
    const coinsTableA = useAppSelector((state) => state.coinsTableA.pages);
    const pageData = coinsTableA[pageNo];

    // Initialize with demo data
    useEffect(() => {
        if (!coinsTableA[1]) {
            dispatch(setCoinsA({ pageNo: 1, coins: FirstReloadConstantDataForExploreCoinsPage }));
        }
    }, [dispatch, coinsTableA]);

    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true);
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&category=layer-1&order=market_cap_desc&per_page=20&page=${pageNo}&price_change_percentage=24h%2C7d%2C30d%2C1y`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    dispatch(setCoinsA({ pageNo, coins: data }));
                    setIsLoading(false);
                    setLastFetchTime(Date.now());
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                });
        };

        const timeSinceLastFetch = Date.now() - lastFetchTime;
        if (!pageData && timeSinceLastFetch > 60000) {  // Avoid fetching within 1 minute
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [pageNo, dispatch, pageData, lastFetchTime]);

    // Use isLoading to conditionally render
    if (isLoading || !pageData) {
        return <ExploreTableShimmer />;
    }

    return (
        <div className='p-8'>
            <div className='text-3xl font-medium mb-6'>Explore Coins</div>
            <ExploreTable data={pageData} pageNo={pageNo} />
            <Pagination pageNo={pageNo} setPageNo={setPageNo} />
        </div>
    );
}

export default Page;
