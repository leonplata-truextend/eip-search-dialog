export interface SearchItemState {
  index: number;
  content: any;
}

export interface CriteriaItemState {
  index: number;
  content: any;
}

export interface CategoryItemState {
  index: number;
  content: any;
}

export interface ErrorState {
  timestamp: number;
  name: string;
  message: string;
}

type IndexMapState = { [index: string]: boolean };

type ErrorMapState = { [index: string]: ErrorState };

export interface SearchResultsState {
  loading: number;
  error?: ErrorState;
  searchText: string;
  results: SearchItemState[];
  filteredResultIndexes: IndexMapState;
  selectedResultIndexes: IndexMapState;
  disabledResultIndexes: IndexMapState;
  skippedResultIndexes: IndexMapState;
  loadingResultIndexes: IndexMapState;
  errorResultIndexes: ErrorMapState;
  criterias: CriteriaItemState[];
  filteredCriteriaIndexes: IndexMapState;
  selectedCriteriaIndex: number;
  categories: CategoryItemState[];
  selectedCategoryIndex: number;
  allSelected: boolean;
}