import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WatchListState {
    data: string[];
}

const initialState: WatchListState = {
    data: ['bitcoin', 'ethereum', 'dogecoin'],
};

export const watchListSlice = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        addCoin: (state, action: PayloadAction<string>) => {
            state.data.push(action.payload);
        },
        removeCoin: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(coin => coin !== action.payload);
        },
    },
});

export const { addCoin, removeCoin } = watchListSlice.actions;
export const watchListReducer = watchListSlice.reducer;