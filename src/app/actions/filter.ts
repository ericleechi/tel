import { createAction } from 'redux-actions';
import { FilterModel } from 'app/models';

export namespace FilterActions {
  export enum Type {
    SET_FILTER = 'SET_FILTER'
  }

  export const setFilter = createAction<FilterModel>(Type.SET_FILTER);
}

export type FilterActions = Omit<typeof FilterActions, 'Type'>;
