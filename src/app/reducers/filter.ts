import { handleActions } from 'redux-actions';
import { RootState } from './state';
import {  FilterModel } from 'app/models';
import { FilterActions } from 'app/actions';

const initialState: RootState.FilterState = {
    
}
export const filterReducer = handleActions<RootState.FilterState, FilterModel>(
  {
  
    [FilterActions.Type.SET_FILTER]:(state,action)=>{
        return {
            ...state,
            ...action.payload
        } 
    },
  },
  initialState
);
