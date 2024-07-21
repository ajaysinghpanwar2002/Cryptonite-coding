import Image from "next/image";
import { formatINR } from "@/lib/utils";
import Link from 'next/link'

const TableHeader: React.FC = () => (
    <thead>
        <tr>
            <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold">Image</th>
            <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold">Name (Symbol)</th>
            <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold">Current Price</th>
            <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold">24h Price Change (%)</th>
            <th className="py-2 px-3 border-b border-gray-200 text-left text-sm font-semibold">Market Cap</th>
        </tr>
    </thead>
);

const TableRow: React.FC<{ coin: any }> = ({ coin }) => (
    <tr>
        <td className="py-2 px-4 border-b border-gray-200">
            <Image src={coin.image} alt={coin.name} className="w-5 h-5" width={16} height={16} />
        </td>
        <td className="py-2 px-3 border-b border-gray-200 text-sm"><Link href={`/explore/${coin.id}`}>{coin.name} ({coin.symbol?.toUpperCase()})</Link></td>
        <td className="py-2 px-3 border-b border-gray-200 text-sm"><Link href={`/explore/${coin.id}`}>{coin.current_price?.toLocaleString()}</Link></td>
        <td className="py-2 px-3 border-b border-gray-200 text-sm"><Link href={`/explore/${coin.id}`}> {coin.price_change_percentage_24h?.toFixed(2)}%</Link></td>
        <td className="py-2 px-3 border-b border-gray-200 text-sm">{formatINR(coin.market_cap)}</td>
    </tr>
);

const CryptoTable: React.FC<{ data: any[] }> = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full">
            <TableHeader />
            <tbody>
                {data.map((coin) => (
                    <TableRow key={coin.id} coin={coin} />
                ))}
            </tbody>
        </table>
    </div>
);

export default CryptoTable;
