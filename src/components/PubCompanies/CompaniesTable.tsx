const TableHeader: React.FC<{ theme: string }> = ({ theme }) => (
    <thead>
        <tr>
            {['Name', 'Country', 'Total Holdings', 'Entry Value (USD)', 'Current Value (USD)', '% of Total Supply'].map((header) => (
                <th
                    key={header}
                    className={`py-2 px-4 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider sticky top-0 bg-gray-400`}
                >
                    {header}
                </th>
            ))}
        </tr>
    </thead>
);

const TableRow: React.FC<{ company: any }> = ({ company }) => (
    <tr>
        <td className="py-2 px-4 border-b border-gray-300">{company?.name}</td>
        <td className="py-2 px-4 border-b border-gray-300">{company?.country}</td>
        <td className="py-2 px-4 border-b border-gray-300">{company?.total_holdings}</td>
        <td className="py-2 px-4 border-b border-gray-300">{company?.total_entry_value_usd}</td>
        <td className="py-2 px-4 border-b border-gray-300">{company?.total_current_value_usd}</td>
        <td className="py-2 px-4 border-b border-gray-300">{company?.percentage_of_total_supply}</td>
    </tr>
);

const TableFooter: React.FC<{ data: any }> = ({ data }) => (
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
);

const CompaniesTable: React.FC<{ data: any, theme: any }> = ({ data, theme }) => {

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
                    <TableHeader theme={theme} />
                    <tbody>
                        {data?.companies?.map((company:any, index:number) => (
                            <TableRow key={index} company={company} />
                        ))}
                    </tbody>
                </table>
            </div>
            <TableFooter data={data} />
        </div>
    );
};

export default CompaniesTable;
