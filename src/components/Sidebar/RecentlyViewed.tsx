'use client'

import { useAppSelector } from "@/lib/store/hooks/hooks";
import { useEffect, useState } from "react";
import CryptoTable from "./CryptoTable";
import { fetchCoinGeckoData } from "../utils/fetchCoinGeckoData";

function RecentlyViewed() {
    const data = useAppSelector(state => state.recentlyViewed.data)
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
                    // setFetchedData(res); 
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }

        fetchData();
    }, [data]); 

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
            <CryptoTable data={fetchedData} />
        </div>
    )
}

export default RecentlyViewed