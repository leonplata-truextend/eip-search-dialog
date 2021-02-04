export interface IUserSearchThunk {
  retrieveInitialData(): any;
}

export const USER_SEARCH_THUNK_PROVIDER = Symbol('USER_SEARCH_THUNK_PROVIDER');