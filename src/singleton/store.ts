import { store } from '@stencil/redux';
import initialStore from '../state/store';
import { RootState } from '../state/root-reducer';

store.setStore(initialStore);

export type StateMapper<E extends object> = (state: RootState) => Partial<E>;

export * from '@stencil/redux';
