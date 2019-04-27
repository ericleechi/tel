import { createAction } from 'redux-actions';
import { ApiModel, FilterModel } from 'app/models';
export namespace ApiActions {
  export interface ILocationParameter {
    latitude:number
    longitude:number
    radius:number
  }
  export interface ILookUpAirQualityParameter{
    filters?:{
      areas?:string
      stations?:string
      components?:string
    }
  
  }
  export interface ILookUpAirQualityParameterWithLocation extends ILookUpAirQualityParameter, ILocationParameter  {
    filters?:{
      method?:string
      components?:string
    }
  
  }
  export interface ILookUpAirQualityHistoricalParameter  {
    filters?:{
      station?:string
      components?:string
    }
    fromtime:string
    totime:string
    station:string
  
  }

  export interface ILookUpAirQualityHistoricalWithLocationParameter extends ILookUpAirQualityHistoricalParameter,ILocationParameter  {
    filters?:{
      station?:string
      components?:string
    }
    fromtime:string
    totime:string
    station:string
  
  }
  export enum API_ACTIONS{
    INITIAL_LOAD='INITIAL_LOADING',
    INITIAL_LOAD_COMPLETED='INITIAL_LOAD_COMPLETED',

    LOOKUP_AIR_QUALITY_UTD='LOOKUP_AIR_QUALITY_UTD',
    LOOKUP_AIR_QUALITY_UTD_COMPLETED = 'LOOKUP_AIR_QUALITY_UTD_COMPLETED',

    LOOKUP_AIR_QUALITY_UTD_WITH_LOCATION='LOOKUP_AIR_QUALITY_UTD_WITH_LOCATION',
    LOOKUP_AIR_QUALITY_UTD_WITH_LOCATION_COMPLETED='LOOKUP_AIR_QUALITY_UTD_WITH_LOCATION_COMPLETED',

    LOOKUP_AIR_QUALITY_HISTORICAL='LOOKUP_AIR_QUALITY_HISTORICAL',
    LOOKUP_AIR_QUALITY_HISTORICAL_COMPLETED='LOOKUP_AIR_QUALITY_HISTORICAL_COMPLETED',

    LOOKUP_AIR_QUALITY_HISTORICAL_WITH_LOCATION='LOOKUP_AIR_QUALITY_HISTORICAL_WITH_LOCATION',
    LOOKUP_AIR_QUALITY_HISTORICAL_WITH_LOCATION_COMPLETED='LOOKUP_AIR_QUALITY_HISTORICAL_WITH_LOCATION_COMPLETED',



    LOOKUP_OBSERVATION_UTD='LOOKUP_OBSERVATION_UTD',
    LOOKUP_OBSERVATION_HISTORICAL='LOOKUP_OBSERVATION_HISTORICAL',

    LOOKUP_STATS='LOOKUP_STATS'
  }
  export const initialLoad = createAction(API_ACTIONS.INITIAL_LOAD)
  export const initialLoadCompleted = createAction<ApiModel.IApiLoadedModel>(API_ACTIONS.INITIAL_LOAD_COMPLETED)


  export const lookupAirQualityUtd = createAction<FilterModel>(API_ACTIONS.LOOKUP_AIR_QUALITY_UTD)
  export const lookupAirQualityUtdCompleted = createAction<ApiModel.IAirQualityModel[]>(API_ACTIONS.LOOKUP_AIR_QUALITY_UTD_COMPLETED)


  export const lookupAirQualityUtdWithLocation = createAction<ILookUpAirQualityParameterWithLocation>(API_ACTIONS.LOOKUP_AIR_QUALITY_UTD_WITH_LOCATION)


  export const lookupAirQualityHistorical = createAction<ILookUpAirQualityParameter>(API_ACTIONS.LOOKUP_AIR_QUALITY_HISTORICAL)
  export const lookupAirQualityHistoricalWithLocation = createAction<ILookUpAirQualityHistoricalWithLocationParameter>(API_ACTIONS.LOOKUP_AIR_QUALITY_HISTORICAL_WITH_LOCATION)

}

export type ApiActions = Omit<typeof ApiActions, 'API_ACTIONS'>
