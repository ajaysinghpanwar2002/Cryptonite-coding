import ThemeSwitch from "./ThemeSwitch";
import Title from './Title';
import SearchBar from "./SearchBar";
import WatchList from "./WatchList";
import Explore from "./Explore";

function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center">
                <Title text="Cryptonite" />
                <Explore text="Explore"/>
            </div>
            <div className="relative my-2 sm:my-0">
                <SearchBar />
            </div>
            <div className="flex items-center">
                <ThemeSwitch />
            </div>
        </nav>
    );
}

export default Navbar;