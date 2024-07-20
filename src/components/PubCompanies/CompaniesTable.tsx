import React from 'react';

const CompaniesTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
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
                <table className="min-w-full ">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Symbol</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Country</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Total Holdings</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Entry Value (USD)</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Current Value (USD)</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">% of Total Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.companies?.map((company, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.name}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{company?.symbol}</td>
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
            <div className="mt-4">
                <p>Total Holdings: {data?.total_holdings}</p>
                <p>Total Value (USD): {data?.total_value_usd}</p>
                <p>Market Cap Dominance: {data?.market_cap_dominance}%</p>
            </div>
        </div>
    );
};

export default CompaniesTable;
