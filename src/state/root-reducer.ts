import { combineReducers } from '@reduxjs/toolkit';
import searchResultsReducer from './search-results';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;