import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer, { AppState } from './rootReducer'

const store = configureStore({
    reducer: rootReducer
})

export type RootState = AppState

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store