import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResultState } from '../../interfaces/state/search-result-state';

const initialState: SearchResultState = {
  loading: 0,
  error: undefined,
  searchText: '',
  results: [],
  filteredResultIndexes: {},
  selectedResultIndexes: {},
  disabledResultIndexes: {},
  skippedResultIndexes: {},
  loadingResultIndexes: {},
  errorResultIndexes: {},
  criterias: [],
  filteredCriteriaIndexes: {},
  selectedCriteriaIndex: -1,
  categories: [],
  selectedCategoryIndex: -1,
  allSelected: false,
};

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {

    /**
     * 
     * @param state 
     */
    initialize(state) {
      Object.assign(state, initialState);
    },

    /**
     * 
     * @param state 
     */
    isLoading(state) {
      state.loading += 1;
    },

    /**
     * 
     * @param state 
     */
    hasLoaded(state) {
      state.loading -= 1;
      state.error = undefined;
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    hasError(state, action: PayloadAction<{ error: Error }>) {
      state.loading -= 1;
      state.error = {
        timestamp: Date.now(),
        name: action.payload.error.name,
        message: action.payload.error.message,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    loadResults(state, action: PayloadAction<{ results: any[] }>) {
      state.results = action.payload.results.map((content, index) => ({
        index,
        content,
      }));
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    loadCriterias(state, action: PayloadAction<{ criterias: any[] }>) {
      state.criterias = action.payload.criterias.map((content, index) => ({
        index,
        content,
      }));
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    loadCategories(state, action: PayloadAction<{ categories: any[] }>) {
      state.categories = action.payload.categories.map((content, index) => ({
        index,
        content,
      }));
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    selectResult(state, action: PayloadAction<{ index: number }>) {
      state.selectedResultIndexes = {
        ...state.selectedResultIndexes,
        [action.payload.index]: true,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    deselectResult(state, action: PayloadAction<{ index: number }>) {
      state.selectedResultIndexes = {
        ...state.selectedResultIndexes,
        [action.payload.index]: false,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    selectAllFilteredResults(state) {
      for (const index of Object.keys(state.filteredCriteriaIndexes)) {
        state.selectedResultIndexes[index]
      } 
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    deselectAllFilteredResults(state) {
      const indexes = Object.keys(state.filteredResultIndexes)
        .filter(key => state.filteredResultIndexes[key]);
      const filteredResultIndexes = { ...state.filteredResultIndexes };
      for (const index of indexes) {
        filteredResultIndexes[index] = false;
      }
      state.filteredResultIndexes = filteredResultIndexes;
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    filterResults(state, action: PayloadAction<{ indexes: number[], searchText: string }>) {
      const { indexes, searchText } = action.payload;
      state.searchText = searchText;
      const indexMap = {};
      for (const index of indexes) {
        indexMap[index] = true;
      }
      state.filteredResultIndexes = indexMap;
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    skipResults(state, action: PayloadAction<{ indexes: number[] }>) {
      const indexes = {};
      for (const index of action.payload.indexes) {
        indexes[index] = true;
      }
      state.skippedResultIndexes = indexes;
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    disableResult(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.disabledResultIndexes = {
        ...state.disabledResultIndexes,
        [index]: false,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    enableResult(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.disabledResultIndexes = {
        ...state.disabledResultIndexes,
        [index]: true,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    resultIsLoading(state, action) {
      const { index } = action.payload;
      state.loadingResultIndexes = {
        ...state.loadingResultIndexes,
        [index]: true,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    resultHasLoaded(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.loadingResultIndexes = {
        ...state.loadingResultIndexes,
        [index]: false,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    resultHasError(state, action: PayloadAction<{ index: number, error: Error }>) {
      const { index, error } = action.payload;
      state.loadingResultIndexes = {
        ...state.loadingResultIndexes,
        [index]: false,
      };
      state.errorResultIndexes = {
        ...state.errorResultIndexes,
        [index]: error,
      };
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    selectCriteria(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.selectedCriteriaIndex = index;
    },

    /**
     * 
     * @param state 
     * @param action 
     */
    selectCategory(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.selectedCategoryIndex = index;
      state.selectedCriteriaIndex = -1;
    },
  },
});

export const {
  initialize,
  isLoading,
  hasLoaded,
  hasError,
  filterResults,
  skipResults,
  disableResult,
  enableResult,
  resultIsLoading,
  resultHasLoaded,
  resultHasError,
  selectCriteria,
  selectCategory,
  loadResults,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;