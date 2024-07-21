import RecentlyViewed from "./RecentlyViewed"
import WatchList from "./WatchList"

function Sidebar() {
    return (
        <div className="flex flex-col p-8">
            <div className="">
                <div className="text-2xl font-medium mb-4 mt-2">
                    Watchlist
                </div>
                <WatchList />
            </div>
            <div className="text-2xl font-medium mb-4 mt-14">
                Recently Viewed
            </div>
            <div className="">
                <RecentlyViewed />
            </div>
        </div>
    )
}

export default Sidebar