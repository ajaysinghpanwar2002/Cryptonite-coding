import RecentlyViewed from "./RecentlyViewed"
import WatchList from "./WatchList"

function Sidebar() {
    return (
        <div className="flex flex-col ">
            <div>
                <WatchList />
            </div>
            <div className="">
                <RecentlyViewed />
            </div>
        </div>
    )
}

export default Sidebar