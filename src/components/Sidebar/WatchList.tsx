'use client'

import { useEffect, useState } from 'react'; // Import useEffect and useState
import { useAppSelector } from "@/lib/store/hooks/hooks"
import { fetchCoinGeckoData } from "../utils/fetchCoinGeckoData"
import CryptoTable from "./CryptoTable"

function WatchList() {
    const data = useAppSelector(state => state.watchList.data)
    const [fetchedData, setFetchedData] = useState([]); // State to hold fetched data

    useEffect(() => { // Use useEffect to fetch data on component mount or data change
        async function fetchData() {
            if (data.length > 0) {
                let baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=";
                let idsParam = data.map((id) => id).join('%2C'); // Simplified map function
                let url = baseUrl + idsParam;

                try {
                    // let res = []
                    let res = await fetchCoinGeckoData(url);
                    setFetchedData(res);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }

        fetchData();
    }, [data]); // Dependency array to re-run effect when `data` changes

    if (data.length === 0) {
        return (
            <div>
                <p>Add coins to watchlist</p>
            </div>
        )
    }


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


    if (fetchedData.length === 0) {
        return (
            <WatchListShimmer />
        )
    }

    return (
        <div>
            <CryptoTable data={fetchedData} />
        </div>
    )
}

export default WatchList