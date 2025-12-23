import {Admin1, Admin2, Admin3, Admin4 } from './admin.js'
import { Coord } from './coord.js';

export type CityLocations = {
    geonameId: number;
    name: string;
    searchName: string;
    latitude: string;
    longitude: string;
    featureClass: string;
    featureCode: string;
    countryCode: string;
    cc2: string;
    adminCode1: string;
    adminCode2: string;
    adminCode3: string;
    adminCode4: string;
    modificationDate: Date;
    status: string;
}

export type CityAdminSplit = {
    admin: CityLocations[];
    cities: CityLocations[];
}


// export type CityAdmin = {
//     city: City[],
//     admin: 
// }

export type ProcessCity = {
    admin1: Admin1[];
    admin2: Admin2[];
    admin3: Admin3[];
    admin4: Admin4[];
    // city: City[];
    errors: string[];
}

export type CityList = {
    [key:string]: {
        geonameId: number;
        coord: Coord;
    } []
}