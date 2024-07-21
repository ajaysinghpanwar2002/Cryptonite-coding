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
    coins: Coin[];
}

const initialState: CoinsTableAState = {
    coins: [],
};

export const coinsTableASlice = createSlice({
    name: 'coinsTableA',
    initialState,
    reducers: {
        setCoinsA: (state, action: PayloadAction<Coin[]>) => {
            state.coins = action.payload;
        },
        removeCoinA: (state, action: PayloadAction<string>) => {
            state.coins = state.coins.filter(coin => coin.id !== action.payload);
        },
        addCoinA: (state, action: PayloadAction<Coin>) => {
            state.coins.push(action.payload);
        },
    },
});

export const { setCoinsA, removeCoinA, addCoinA } = coinsTableASlice.actions;

export const coinsTableAReducer = coinsTableASlice.reducer;
