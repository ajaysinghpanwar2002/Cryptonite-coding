import Image from "next/image";
import { useRouter } from 'next/navigation'

function ExploreTable({ data }) {
    const router = useRouter();

    return (
        <div className="overflow-x-auto">
            <div
                className="overflow-y-auto"
                style={{
                    maxHeight: '500px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent'
                }}
            ><style jsx>{`
                ::-webkit-scrollbar {
                    width: 5px;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: transparent;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                div:hover ::-webkit-scrollbar-thumb {
                    background-color: #a0aec0; /* Gray-400 */
                }
            `}</style>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Image</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Name (Symbol)</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Market Cap</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Current Price</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">24h Price Change (%)</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Highest 24h</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold ">Lowest 24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((coin) => (
                            <tr key={coin.id} onClick={()=> router.push(`/explore/${coin.id}`)} className="hover:cursor-pointer">
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <Image src={coin.image ?? '/default-image.png'} alt={coin.name ?? 'Unknown'} className="w-6 h-6" height={20} width={20} />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{coin.name ?? 'Unknown'} ({coin.symbol?.toUpperCase() ?? 'N/A'})</td>
                                <td className="py-2 px-4 border-b border-gray-200">{coin.market_cap?.toLocaleString() ?? 'N/A'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{coin.current_price?.toLocaleString() ?? 'N/A'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{coin.price_change_percentage_24h_in_currency?.toFixed(2) ?? 'N/A'}%</td>
                                <td className="py-2 px-4 border-b border-gray-200">{coin.high_24h?.toLocaleString() ?? 'N/A'}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{coin.low_24h?.toLocaleString() ?? 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExploreTable