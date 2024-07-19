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
                    let res = []
                    // let res = await fetchCoinGeckoData(url);
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

    if (fetchedData.length === 0) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <CryptoTable data={fetchedData} /> {/* Pass fetchedData to CryptoTable */}
        </div>
    )
}

export default WatchList