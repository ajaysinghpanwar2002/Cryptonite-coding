import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from '../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // when we want to send data into the store
export const useAppSelector = useSelector.withTypes<RootState>() // when we want to get data from the store
export const useAppStore = useStore.withTypes<AppStore>()