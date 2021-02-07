import { store } from '@stencil/redux';
import { StoreService } from '../services/store-service';
import { RootState } from '../state/root-reducer';

store.setStore(StoreService);

export type StateMapper<E extends object> = (state: RootState) => Partial<E>;

export type DispatchMapper<A extends object, E extends object> = (actions: A) => Partial<E>;

export * from '@stencil/redux';
