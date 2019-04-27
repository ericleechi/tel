import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ApiActions } from 'app/actions';
import { ApiModel } from 'app/models';

const initialState: RootState.ApiState = {
    areas:[],
    airqualityindex:[],
    components:[],
    stations:[],
    utd:[]
}

export const apiReducer = handleActions<RootState.ApiState,ApiModel.IApiLoadedModel>(
  {
    [ApiActions.API_ACTIONS.INITIAL_LOAD_COMPLETED]: (state, action) => {
       return action.payload || initialState
    },

    [ApiActions.API_ACTIONS.LOOKUP_AIR_QUALITY_UTD_COMPLETED]: (state, action) => {

      return {
        ...state,
        utd : action.payload ? action.payload as any: state.utd
      }

   }
  },
  initialState
);
