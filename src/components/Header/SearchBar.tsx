'use client'

import { useState, useEffect } from "react";
import cryptocurrencies from "../../data.json"
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes';
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { addCoin } from "@/lib/store/features/recentlyViewed/recentlyViewed";

interface Cryptocurrency {
    id: string;
    name: string;
    symbol: string;
}

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Cryptocurrency[]>([]);
    const [debounceTimer, setDebounceTimer] = useState(null);
    const router = useRouter()
    const { theme } = useTheme();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (debounceTimer) clearTimeout(debounceTimer);

        const timer = setTimeout(() => {
            if (searchTerm.length > 0) {
                const filteredSuggestions = cryptocurrencies.filter(crypto =>
                    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
            } else {
                setSuggestions([]);
            }
        }, 500); // 300ms debounce time

        setDebounceTimer(timer);

        // Cleanup function to clear the timer
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const updateSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const chooseSuggestion = (suggestion: Cryptocurrency) => {
        setSearchTerm(suggestion.name);
        dispatch(addCoin(suggestion.id)); // add the selected suggestion coin id to the slice of recent
        setSuggestions([]);
        router.push(`/explore/${suggestion.id}`)
        setSearchTerm("")
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Cryptocurrencies"
                className={`p-2 rounded w-96  ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                value={searchTerm}
                onChange={updateSearchTerm}
            />
            <ul className={`suggestions-list absolute z-10 max-h-60 w-full overflow-auto  ${theme === 'dark' ? '' : 'text-black bg-white'} rounded shadow-lg mt-1`}>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => chooseSuggestion(suggestion)} className={`p-2 ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-900' : 'hover:bg-slate-50 text-black bg-white'} cursor-pointer flex justify-start`}>
                        {suggestion.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;