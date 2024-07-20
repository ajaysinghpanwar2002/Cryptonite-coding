'use client'

import React, { useState, useEffect } from 'react';
import ExploreTable from '@/components/Explore/ExploreTable';

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
function Pagination({ pageNo, setPageNo }) {
    return (
        <div className="flex justify-around m-10">
            <button onClick={() => setPageNo(prevPageNo => Math.max(prevPageNo - 1, 1))} disabled={pageNo === 1}>Previous</button>
            <button onClick={() => setPageNo(prevPageNo => prevPageNo + 1)}>Next</button>
        </div>
    );
}

// Main Page Component
function Page() {
    const [pageNo, setPageNo] = useState(1);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&category=layer-1&order=market_cap_desc&per_page=20&page=${pageNo}&price_change_percentage=24h%2C7d%2C30d%2C1y`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [pageNo]);

    // Use isLoading to conditionally render
    if (isLoading || data.length == 0) {
        return <ExploreTableShimmer />;
    }

    return (
        <div className='p-8'>
            <div className='text-3xl font-medium mb-6'>Explore Coins</div>
            <ExploreTable data={data} />
            <Pagination pageNo={pageNo} setPageNo={setPageNo} />
        </div>
    );
}

export default Page;
