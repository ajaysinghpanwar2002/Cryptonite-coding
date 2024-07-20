'use client'

import { useState, useEffect } from "react";
import { fetchCoinGeckoData } from "../utils/fetchCoinGeckoData"; // Assuming FetchCoinGeckoData.tsx is in the same directory
import CompaniesTable from "./CompaniesTable";

function PubCompanies() {
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [coinData, setCoinData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const coins = ['bitcoin', 'ethereum']; // Add the list of available coins

    let url = `https://api.coingecko.com/api/v3/companies/public_treasury/${selectedCoin}`;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCoinGeckoData(url);
                setCoinData(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedCoin]);

    const handleCoinChange = (e) => {
        setSelectedCoin(e.target.value);
    };

    return (
        <div>
            <h1>PubCompanies having {selectedCoin}</h1>
            <div>
                {coins.map((coin) => (
                    <label key={coin}>
                        <input
                            type="radio"
                            value={coin}
                            checked={selectedCoin === coin}
                            onChange={handleCoinChange}
                        />
                        {coin}
                    </label>
                ))}
            </div>
            {isLoading ? <p>Loading...</p> : <CompaniesTable data={coinData} />}
        </div>
    );
}

export default PubCompanies;
