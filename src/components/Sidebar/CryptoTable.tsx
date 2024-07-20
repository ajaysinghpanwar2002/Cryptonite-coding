import Image from "next/image";
import { formatINR } from "@/lib/utils";

const CryptoTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold ">Image</th>
                        <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold ">Name (Symbol)</th>
                        <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold ">Current Price</th>
                        <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold ">24h Price Change (%)</th>
                        <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold ">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coin) => (
                        <tr key={coin.id}>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <Image src={coin.image} alt={coin.name} className="w-5 h-5" width={16} height={16} />
                            </td>
                            <td className="py-2 px-3 border-b border-gray-200 text-sm">{coin.name} ({coin.symbol?.toUpperCase()})</td>
                            <td className="py-2 px-3 border-b border-gray-200 text-sm">{coin.current_price?.toLocaleString()}</td>
                            <td className="py-2 px-3 border-b border-gray-200 text-sm">{coin.price_change_percentage_24h?.toFixed(2)}%</td>
                            <td className="py-2 px-3 border-b border-gray-200 text-sm">
                                {formatINR(coin.market_cap)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
