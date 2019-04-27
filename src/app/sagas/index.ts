import { takeEvery, all,put,select } from 'redux-saga/effects'
import {ApiActions}  from '../actions/apis'
import {stringify} from 'query-string'
import { Action } from 'redux-actions';
import { FilterActions } from 'app/actions';
import { FilterModel } from 'app/models';
import { RootState } from 'app/reducers';
// use them in parallel
const apiURL = 'https://api.nilu.no'
function* initialloading(){
  const [areas,stations,aqis,components,utd] = yield all([
    fetch(`${apiURL}/lookup/areas`),
    fetch(`${apiURL}/lookup/stations`),
    fetch(`${apiURL}/lookup/aqis`),
    fetch(`${apiURL}/lookup/components`),
  ])
  yield put(ApiActions.initialLoadCompleted({
    stations: yield stations.json(),
    areas: yield areas.json(),
    airqualityindex: yield aqis.json(),
    components: yield components.json(),
    utd:[]
  }))
  
}
function* lookupUTD(action:Action<FilterModel>){
  let parameters  = null
  const state : RootState = yield select()
  if(action && action.payload ){
    parameters = stringify(Object.assign({
      areas: state.filter.area,
      components: state.filter.area,
      stations:state.filter.station
    },{
      areas: action.payload.area,
      components: action.payload.component,
      stations:action.payload.station
    }))
  }

  const udt = yield fetch(`${apiURL}/aq/utd?${parameters}`)
  const json = yield udt.json()
  yield put(ApiActions.lookupAirQualityUtdCompleted(json))
}


export function* rootSaga() {
  yield takeEvery(ApiActions.API_ACTIONS.INITIAL_LOAD,initialloading)
  yield takeEvery(ApiActions.API_ACTIONS.LOOKUP_AIR_QUALITY_UTD,lookupUTD)

}