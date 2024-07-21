
function LineChartShimmer({theme}:{theme:string}) {
    return (
        <div className={`w-full h-96 overflow-hidden relative rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}>
            <div className="shimmer h-full"></div>
        </div>
    )
}

export default LineChartShimmer