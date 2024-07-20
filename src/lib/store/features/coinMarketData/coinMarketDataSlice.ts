import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CoinMarketDataState {
    data:[];
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
        setData: (state, action: PayloadAction<[]>) => {
            state.data = action.payload;
        },
        setLastFetchTime: (state, action: PayloadAction<number>) => {
            state.lastFetchTime = action.payload;
        },
    },
});

export const { setData, setLastFetchTime } = coinMarketDataSlice.actions;

export const coinMarketDataReducer = coinMarketDataSlice.reducer;