import { FaDollarSign, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io';

const MarketDataItem: React.FC<{ icon: React.ReactNode, label: string, value: any, valueClass?: string }> = ({ icon, label, value, valueClass }) => (
    <div className="flex items-center p-3 rounded-lg">
        {icon}
        <span className="font-semibold ml-2">{label}:</span>
        <span className={`ml-2 ${valueClass}`}>{value}</span>
    </div>
);

const MarketDataGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {children}
    </div>
);

function MarketData({ data }:{data: any}) {
    const {
        current_price,
        ath,
        atl,
        high_24h,
        low_24h,
        price_change_percentage_24h_in_currency,
    } = data?.market_data || {};

    const getPriceChangeIcon = (change: number) =>
        change > 0 ? <IoMdTrendingUp className="text-green-500 mr-2" /> : <IoMdTrendingDown className="text-red-500 mr-2" />;

    return (
        <div className="p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Market Data</            h2>
            <MarketDataGrid>
                <MarketDataItem
                    icon={<FaDollarSign className="text-green-500 mr-2" />}
                    label="Current Price"
                    value={current_price?.inr}
                />
                <MarketDataItem
                    icon={<FaChartLine className="text-blue-500 mr-2" />}
                    label="All Time High"
                    value={ath?.inr}
                />
                <MarketDataItem
                    icon={<FaArrowDown className="text-red-500 mr-2" />}
                    label="All Time Low"
                    value={atl?.inr}
                />
                <MarketDataItem
                    icon={<FaArrowDown className="text-red-500 mr-2" />}
                    label="Low 24h"
                    value={low_24h?.inr}
                />
                <MarketDataItem
                    icon={getPriceChangeIcon(price_change_percentage_24h_in_currency?.inr)}
                    label="Price 24h"
                    value={`${price_change_percentage_24h_in_currency?.inr}%`}
                />
                <MarketDataItem
                    icon={<FaChartLine className="text-purple-500 mr-2" />}
                    label="High 24h"
                    value={high_24h?.inr}
                />
            </MarketDataGrid>
        </div>
    );
}

export default MarketData;
