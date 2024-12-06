import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { Action } from '../core/models/ActionTypes'
import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { cuisinesReducer, loaderReducer, restaurantReducer } from 'redux-slices';

const rootReducer = {
    loader: loaderReducer,
    cuisines:cuisinesReducer,
    restaurants:restaurantReducer
}

const store = configureStore({
    reducer: rootReducer,
})

export default store

export type Store = ReturnType<typeof store.getState>
export type TypedDispatch = ThunkDispatch<Store, any, Action>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, Store, unknown, Action>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<Store> = useSelector;