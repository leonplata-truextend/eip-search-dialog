export interface IUserSearchThunk {
  retrieveInitialData(): any;
}

export const USER_SEARCH_THUNK = Symbol('USER_SEARCH_THUNK');