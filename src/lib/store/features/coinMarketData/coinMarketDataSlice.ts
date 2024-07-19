import { CoinMarketData } from '@/components/Home/HomePage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoinMarketDataState {
    data: CoinMarketData[];
    lastFetchTime: number;
}

const initialState: CoinMarketDataState = {
    data: [],
    lastFetchTime: 0,
};

export const coinMarketDataSlice = createSlice({
    name: 'coinMarketData',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<CoinMarketData[]>) => {
            state.data = action.payload;
        },
        setLastFetchTime: (state, action: PayloadAction<number>) => {
            state.lastFetchTime = action.payload;
        },
    },
});

export const { setData, setLastFetchTime } = coinMarketDataSlice.actions;

export default coinMarketDataSlice.reducer;