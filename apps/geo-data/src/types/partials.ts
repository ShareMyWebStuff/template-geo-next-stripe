import { Coord } from "./coord.js";

export type Partials = {
    countryCode: string;
    postcode: string;
    placeName: string;
    searchName: string;
    adminName1: string;
    adminCode1: string;
    adminName2: string;
    adminCode2: string;
    adminName3: string;
    adminCode3: string;
    latitude: string;
    longitude: string;
    status: string;
    geonameIdSet: boolean
    geonameId: number;
}

export type ProcessPartials = {
 
    errors: string[];

}

export type PartialList = { [city: string ]: { 
        [admRegion: string ]: {
            coords: Coord[]
            avgLat: number
            avgLong: number
            geonameId: number
        }}
    }
