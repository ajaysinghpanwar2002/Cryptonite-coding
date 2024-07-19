import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecentlyViewedState {
    data: string[];
}

const initialState: RecentlyViewedState = {
    data: ['bitcoin', 'ethereum', 'dogecoin'],
};

export const recentlyViewedSlice = createSlice({
    name: 'recentlyViewed',
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

export const { addCoin, removeCoin } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;