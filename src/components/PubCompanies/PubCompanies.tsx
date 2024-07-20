'use client'

import { useState, useEffect } from "react";
import { fetchCoinGeckoData } from "../utils/fetchCoinGeckoData";
import CompaniesTable from "./CompaniesTable";

const ShimmerTable: React.FC = () => (
    <div className="animate-pulse space-y-4">
        <div className="flex flex-col">
            {[...Array(9)].map((_, index) => (
                <div key={index} className="flex space-x-4 p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    </div>
);

const CoinSelector: React.FC<{ coins: string[], selectedCoin: string, onChange: (coin: string) => void }> = ({ coins, selectedCoin, onChange }) => (
    <div className="flex flex-row flex-wrap items-center space-x-4 p-4 rounded-lg shadow-md">
        {coins.map((coin) => (
            <label key={coin} className="flex items-center space-x-3 cursor-pointer">
                <input
                    type="radio"
                    value={coin}
                    checked={selectedCoin === coin}
                    onChange={(e) => onChange(e.target.value)}
                    className="radio radio-primary appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                />
                <span className="text-md text-gray-700 font-medium">{coin}</span>
            </label>
        ))}
    </div>
);

function PubCompanies() {
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [coinData, setCoinData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const coins = ['bitcoin', 'ethereum'];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCoinGeckoData(`https://api.coingecko.com/api/v3/companies/public_treasury/${selectedCoin}`);
                setCoinData(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedCoin]);

    return (
        <div>
            <h1 className="text-3xl font-medium mb-4 mt-8">Public Companies with {selectedCoin}</h1>
            <CoinSelector coins={coins} selectedCoin={selectedCoin} onChange={setSelectedCoin} />
            {isLoading ? <ShimmerTable /> : <CompaniesTable data={coinData} />}
        </div>
    );
}

export default PubCompanies;
