export interface AdvancedSearchService {
  retrieveInitialData(): any;
}

export const ADVANCED_SEARCH_SERVICE_PROVIDER = Symbol('ADVANCED_SEARCH_SERVICE_PROVIDER');