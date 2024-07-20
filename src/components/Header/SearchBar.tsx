'use client'

import { useState, useEffect } from "react";
import cryptocurrencies from "../../data.json"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
        setSuggestions([]);
        router.push(`/explore/${suggestion.id}`)
        setSearchTerm("")
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Cryptocurrencies"
                className="p-2 rounded text-gray-500 w-96"
                value={searchTerm}
                onChange={updateSearchTerm}
            />
            <ul className="suggestions-list absolute z-10 max-h-60 w-full overflow-auto bg-white rounded shadow-lg mt-1">
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => chooseSuggestion(suggestion)} className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800 flex justify-start">
                        {suggestion.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;