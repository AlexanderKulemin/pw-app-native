import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { IRootState } from '../models';
import authReducer from './auth';
import usersReducer from './users';

const rootReducer = combineReducers<IRootState>({
  auth: authReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
