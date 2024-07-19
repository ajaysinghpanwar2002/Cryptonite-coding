'use client'

import React, { useState, useEffect } from 'react';
import ExploreTable from '@/components/Explore/ExploreTable';

function Page() {
    const [pageNo, setPageNo] = useState(1);
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&category=layer-1&order=market_cap_desc&per_page=20&page=${pageNo}&price_change_percentage=24h%2C7d%2C30d%2C1y`;
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => setData(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, [pageNo]);

    if (data.length == 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ExploreTable data={data} />
            <div className="flex justify-around m-10">
                <button onClick={() => setPageNo(prevPageNo => Math.max(prevPageNo - 1, 1))} disabled={pageNo === 1}>Previous</button>
                <button onClick={() => setPageNo(prevPageNo => prevPageNo + 1)}>Next</button>
            </div>
        </div>
    );
}

export default Page;