
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.ts';
import storyReducer from './storySlice.ts';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        user: userReducer,
        stories: storyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
