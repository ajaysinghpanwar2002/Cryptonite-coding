import ThemeSwitch from "./ThemeSwitch";
import Title from './Title';
import SearchBar from "./SearchBar";
import WatchList from "./WatchList";

function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <Title text="Cryptonite" />
            <div className="relative">
                <SearchBar />
            </div>
            <div className="flex items-center">
                <WatchList />
                <ThemeSwitch />
            </div>
        </nav>
    );
}

export default Navbar;