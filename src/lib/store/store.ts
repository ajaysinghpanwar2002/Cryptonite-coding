import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";

// reducers 
import { coinMarketDataReducer } from "./features/coinMarketData/coinMarketDataSlice";
import { recentlyViewedReducer } from "./features/recentlyViewed/recentlyViewed";
import { watchListReducer } from "./features/watchList/watchList";
import { coinsTableAReducer } from "./features/dragable/coinsTableA";
import { coinsTableBReducer } from "./features/dragable/coinsTableB";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const coinMarketDataPersistConfig = {
    key: "coinMarketData",
    storage: storage,
    whitelist: ["data", "lastFetchTime"],
};

const recentlyViewedPersistConfig = {
    key: "recentlyViewed",
    storage: storage,
    whitelist: ["data"],
};

const watchListPersistConfig = {
    key: "watchList",
    storage: storage,
    whitelist: ["data"],
};

const coinTableAPersistConfig = {
    key: "coinsTableA",
    storage: storage,
    whitelist: ["coins"],
};

const coinTableBPersistConfig = {
    key: "coinsTableB",
    storage: storage,
    whitelist: ["coins"],
};

const persistedcoinMarketDataReducer = persistReducer(coinMarketDataPersistConfig, coinMarketDataReducer);
const persistedRecentlyViewedReducer = persistReducer(recentlyViewedPersistConfig, recentlyViewedReducer);
const persistedWatchListReducer = persistReducer(watchListPersistConfig, watchListReducer);
const persistedCoinTableAReducer = persistReducer(coinTableAPersistConfig, coinsTableAReducer);
const persistedCoinTableBReducer = persistReducer(coinTableBPersistConfig, coinsTableBReducer);

const rootReducer = combineReducers({
    coinMarketData: persistedcoinMarketDataReducer,
    recentlyViewed: persistedRecentlyViewedReducer,
    watchList: persistedWatchListReducer,
    coinsTableA: persistedCoinTableAReducer,
    coinsTableB: persistedCoinTableBReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;