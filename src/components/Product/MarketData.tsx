import { FaDollarSign, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io';

function MarketData({ data }) {
    const {
        current_price,
        ath,
        ath_change_percentage,
        ath_date,
        atl,
        atl_change_percentage,
        atl_date,
        market_cap,
        high_24h,
        low_24h,
        price_change_percentage_24h_in_currency,
    } = data?.market_data || {};

    return (
        <div className="p-4 rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Market Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center  p-3 rounded-lg">
                    <FaDollarSign className="text-green-500 mr-2" />
                    <span className="font-semibold">Current Price:</span>
                    <span className="ml-2">{current_price?.inr}</span>
                </div>
                <div className="flex items-center  p-3 rounded-lg">
                    <FaChartLine className="text-blue-500 mr-2" />
                    <span className="font-semibold">All Time High:</span>
                    <span className="ml-2">{ath?.inr}</span>
                </div>
                <div className="flex items-center  p-3 rounded-lg">
                    <FaArrowDown className="text-red-500 mr-2" />
                    <span className="font-semibold">All Time Low:</span>
                    <span className="ml-2">{atl?.inr}</span>
                </div>
                <div className="flex items-center  p-3 rounded-lg">
                    <FaArrowDown className="text-red-500 mr-2" />
                    <span className="font-semibold">Low 24h:</span>
                    <span className="ml-2">{low_24h?.inr}</span>
                </div>
                <div className="flex items-center  p-3 rounded-lg">
                    {price_change_percentage_24h_in_currency?.inr > 0 ? (
                        <IoMdTrendingUp className="text-green-500 mr-2" />
                    ) : (
                        <IoMdTrendingDown className="text-red-500 mr-2" />
                    )}
                    <span className="font-semibold">Price 24h:</span>
                    <span className="ml-2">{price_change_percentage_24h_in_currency?.inr}%</span>
                </div>
                <div className="flex items-center  p-3 rounded-lg">
                    <FaChartLine className="text-purple-500 mr-2" />
                    <span className="font-semibold">High 24h:</span>
                    <span className="ml-2">{high_24h?.inr}</span>
                </div>
            </div>
        </div>
    );
}

export default MarketData;
