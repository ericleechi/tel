
export namespace ApiModel {
    export interface IAreaModel {
        zone:         string;
        municipality: string;
        area:         string;
    }

    export interface IAirQualityIndexModel {
        component: string;
        unit:      string;
        aqis:      Aqi[];
    }
    
    export interface Aqi {
        index:            number;
        fromValue:        number;
        toValue:          number;
        color:            string;
        text:             string;
        shortDescription: string;
        description:      string;
        advice:           string;
    }
    
    export interface IAirQualityModel {
        zone:         string;
        municipality: string;
        area:         string;
        station:      string;
        eoi:          string;
        component:    string;
        fromTime:     string;
        toTime:       string;
        value:        number;
        unit:         string;
        color:        string;
     
    }
    
    export interface IAirQualityWithLocation extends IAirQualityModel{
        latitude:     number;
        longitude:    number;
        timestep:     number;
        index:        number;
        color:        string;
    }
    
    export interface IAirQualityWithHistorical extends IAirQualityWithLocation {
        values:       IValue[];
    }
    
    export interface IValue {
        fromTime:          string;
        toTime:            string;
        value:             number;
        qualityControlled: boolean;
        index:             number;
        color:             string;
    }
    export interface IStationModel {
        id:              number;
        zone:            string;
        municipality:    string;
        area:            string;
        station:         string;
        eoi:             string;
        latitude:        number;
        longitude:       number;
        owner:           string;
        status:          string;
        description:     string;
        firstMeasurment: string;
        lastMeasurment:  string;
        components:      string;
    }
    export interface IComponentModel {
        component: string;
        topic:     string;
    }

    export interface IApiLoadedModel{
        areas:ApiModel.IAreaModel[],
        stations:ApiModel.IStationModel[],
        airqualityindex:ApiModel.IAreaModel[],
        components:ApiModel.IComponentModel[],
        utd:IAirQualityModel[]
    }
    
    
}
  