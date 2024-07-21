import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from './coinsTableA';

export interface CoinsTableBState {
    coins: Coin[];
}

const initialState: CoinsTableBState = {
    coins: [],
};

export const coinsTableBSlice = createSlice({
    name: 'coinsTableB',
    initialState,
    reducers: {
        setCoinsB: (state, action: PayloadAction<Coin[]>) => {
            state.coins = action.payload;
        },
        removeCoinB: (state, action: PayloadAction<string>) => {
            state.coins = state.coins.filter(coin => coin.id !== action.payload);
        },
        addCoinB: (state, action: PayloadAction<Coin>) => {
            if (!Array.isArray(state.coins)) {
                state.coins = [];
            }
            const coinExists = state.coins.some(coin => coin.id === action.payload.id);
            if (!coinExists) {
                state.coins.push(action.payload);
            }
        },
    },
});

export const { setCoinsB, removeCoinB, addCoinB } = coinsTableBSlice.actions;

export const coinsTableBReducer = coinsTableBSlice.reducer;
