'use client'

import { useAppSelector } from "@/lib/store/hooks/hooks"
import CryptoTable from "./CryptoTable"

// Shimmer component for loading state
function WatchListShimmer() {
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
    )
}

function WatchList() {
    const coinsSet = useAppSelector((state) => state.coinsTableB.coins);
    const data = Array.from(coinsSet);

    return (
        <div>
            {data.length === 0 ? <div>Add coins to watchlist</div> : <CryptoTable data={data} />}
        </div>
    )
}

export default WatchList;
