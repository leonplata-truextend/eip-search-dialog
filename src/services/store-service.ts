import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../state/root-reducer';

export const StoreService = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof StoreService.dispatch;
