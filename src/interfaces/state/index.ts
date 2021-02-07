import { CombinedState, AnyAction } from 'redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { ThunkMiddleware } from 'redux-thunk';
import { SearchResultState } from './search-result-state';

export interface AppState {
  searchResults: SearchResultState;
}

export type AppStore = EnhancedStore<CombinedState<AppState>, AnyAction, [ThunkMiddleware<CombinedState<AppState>, AnyAction, null>]>;

export const APP_STORE_PROVIDER = Symbol('APP_STORE_PROVIDER');