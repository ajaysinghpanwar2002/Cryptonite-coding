'use client'

import { useState, useEffect, useCallback } from "react";
import cryptocurrencies from "../../data.json"
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes';

interface Cryptocurrency {
    id: string;
    name: string;
    symbol: string;
}

const DEBOUNCE_TIME = 500; // milliseconds

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Cryptocurrency[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(-1); // For keyboard navigation
    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_TIME);
    const router = useRouter();
    const { theme } = useTheme();

    useEffect(() => {
        if (debouncedSearchTerm) {
            const filteredSuggestions = cryptocurrencies.filter(crypto =>
                crypto.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setActiveIndex(-1); // Reset the active index when the suggestions change
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm]);

    const updateSearchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const chooseSuggestion = useCallback((suggestion: Cryptocurrency) => {
        router.push(`/explore/${suggestion.id}`);
        setSearchTerm("");
    }, [router]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setActiveIndex(prevIndex => (prevIndex + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            setActiveIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Enter" && activeIndex >= 0) {
            chooseSuggestion(suggestions[activeIndex]);
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Cryptocurrencies"
                className={`p-2 rounded w-full sm:w-96 ${theme === 'dark' ? 'text-white' : 'text-black'} text-sm sm:text-base`}
                value={searchTerm}
                onChange={updateSearchTerm}
                onKeyDown={handleKeyDown}
            />
            <ul
                className={`suggestions-list absolute z-10 max-h-60 w-full overflow-auto ${theme === 'dark' ? '' : 'text-black bg-white'} rounded shadow-lg mt-1 text-sm sm:text-base`}
                role="listbox"
            >
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        onClick={() => chooseSuggestion(suggestion)}
                        className={`p-2 ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-900' : 'hover:bg-slate-50 text-black bg-white'} cursor-pointer flex justify-start ${index === activeIndex ? (theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100') : ''}`}
                        role="option"
                    >
                        {suggestion.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
