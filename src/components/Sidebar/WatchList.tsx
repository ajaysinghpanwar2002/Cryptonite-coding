'use client'

import { useEffect, useState } from 'react';
import { useAppSelector } from "@/lib/store/hooks/hooks"
import { fetchCoinGeckoData } from "../utils/fetchCoinGeckoData"
import CryptoTable from "./CryptoTable"

// Shimmer component for loading state
function WatchListShimmer() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-300 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Component to fetch and manage data
function FetchData({ data, setFetchedData }) {
    useEffect(() => {
        async function fetchData() {
            if (data.length > 0) {
                let baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=";
                let idsParam = data.map((id) => id).join('%2C');
                let url = baseUrl + idsParam;

                try {
                    let res = await fetchCoinGeckoData(url);
                    setFetchedData(res);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }

        fetchData();
    }, [data, setFetchedData]);
}

// Main WatchList component
function WatchList() {
    const data = useAppSelector(state => state.watchList.data);
    const [fetchedData, setFetchedData] = useState([]);

    if (data.length === 0) {
        return (
            <div>
                <p>Add coins to watchlist</p>
            </div>
        )
    }

    return (
        <div>
            <FetchData data={data} setFetchedData={setFetchedData} />
            {fetchedData.length === 0 ? <WatchListShimmer /> : <CryptoTable data={fetchedData} />}
        </div>
    )
}

export default WatchList;
