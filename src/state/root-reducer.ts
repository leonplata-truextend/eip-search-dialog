import { combineReducers } from '@reduxjs/toolkit';
import searchResultsReducer from './slices/search-result';
import { AppState } from '../interfaces/state'

const rootReducer = combineReducers<AppState>({
  searchResults: searchResultsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;