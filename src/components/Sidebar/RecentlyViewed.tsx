'use client'

import { useAppSelector } from "@/lib/store/hooks/hooks";
import { useEffect, useState } from "react";
import CryptoTable from "./CryptoTable";
import { fetchCoinGeckoData } from "../utils/fetchCoinGeckoData";

function useFetchData(data) {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (data.length > 0) {
                let baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=";
                let idsParam = data.map((id) => id).join('%2C');
                let url = baseUrl + idsParam;

                try {
                    setLoading(true);
                    let res = await fetchCoinGeckoData(url);
                    setFetchedData(res);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchData();
    }, [data]);

    return { fetchedData, loading };
}

function RecentlyViewedShimmer() {
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
    );
}

function RecentlyViewed() {
    const data = useAppSelector(state => state.recentlyViewed.data);
    const { fetchedData, loading } = useFetchData(data);

    if (data.length === 0) {
        return (
            <div>
                <p>Add coins to watchlist</p>
            </div>
        );
    }

    if (loading) {
        return <RecentlyViewedShimmer />;
    }

    return (
        <div>
            <CryptoTable data={fetchedData} canBeEdited={false} />
        </div>
    );
}

export default RecentlyViewed