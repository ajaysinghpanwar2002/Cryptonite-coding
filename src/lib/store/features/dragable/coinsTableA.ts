import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Coin {
    id: string;
    image: string;
    name: string;
    symbol: string;
    market_cap: number;
    current_price: number;
    price_change_percentage_24h_in_currency: number;
    high_24h: number;
    low_24h: number;
}

export interface CoinsTableAState {
    pages: { [pageNo: number]: Coin[] };
}

const initialState: CoinsTableAState = {
    pages: {},
};

export const coinsTableASlice = createSlice({
    name: 'coinsTableA',
    initialState,
    reducers: {
        setCoinsA: (state, action: PayloadAction<{ pageNo: number, coins: Coin[] }>) => {
            state.pages[action.payload.pageNo] = action.payload.coins;
        },
        removeCoinA: (state, action: PayloadAction<{ pageNo: number, coinId: string }>) => {
            state.pages[action.payload.pageNo] = state.pages[action.payload.pageNo].filter(coin => coin.id !== action.payload.coinId);
        },
        addCoinA: (state, action: PayloadAction<{ pageNo: number, coin: Coin }>) => {
            state.pages[action.payload.pageNo].push(action.payload.coin);
        },
    },
});

export const { setCoinsA, removeCoinA, addCoinA } = coinsTableASlice.actions;

export const coinsTableAReducer = coinsTableASlice.reducer;
