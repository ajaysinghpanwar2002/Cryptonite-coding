import React from 'react';

import { useTheme } from 'next-themes';

const CompaniesTable = ({ data }) => {
    const { theme } = useTheme();
    return (
        <div className="overflow-x-auto mt-4">
            <div
                className="overflow-y-auto"
                style={{
                    maxHeight: '400px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent'
                }}
            >
                <style jsx>{`
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
                            <th className={`py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider sticky top-0 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>Name</th>
                            <th className={`py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider sticky top-0 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>Country</th>
                            <th className={`py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider sticky top-0 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>Total Holdings</th>
                            <th className={`py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider sticky top-0 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>Entry Value (USD)</th>
                            <th className={`py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider sticky top-0 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>Current Value (USD)</th>
                            <th className={`py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider sticky top-0 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>% of Total Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.companies?.map((company, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.name}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.country}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.total_holdings}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.total_entry_value_usd}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.total_current_value_usd}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.percentage_of_total_supply}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-8 space-y-2">
                <div className="grid grid-cols-[auto_minmax(200px,_1fr)] gap-2 items-center">
                    <p className="text-lg font-semibold">Total Holdings:</p>
                    <span className="text-lg font-normal text-right">{data?.total_holdings}</span>
                </div>
                <div className="grid grid-cols-[auto_minmax(200px,_1fr)] gap-2 items-center">
                    <p className="text-lg font-semibold">Total Value (USD):</p>
                    <span className="text-lg font-normal text-right">{data?.total_value_usd}</span>
                </div>
                <div className="grid grid-cols-[auto_minmax(200px,_1fr)] gap-2 items-center">
                    <p className="text-lg font-semibold">Market Cap Dominance:</p>
                    <span className="text-lg font-normal text-right">{data?.market_cap_dominance}%</span>
                </div>
            </div>
        </div>
    );
};

export default CompaniesTable;
