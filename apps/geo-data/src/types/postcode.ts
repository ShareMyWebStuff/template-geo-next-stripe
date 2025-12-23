import { Coord } from "./coord.js";

export type Postcodes = {
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

export type ProcessPostcode = {
 
    errors: string[];

}

export type PostcodeList = { [city: string ]: { 
        [admRegion: string ]: {
            coords: Coord[]
            avgLat: number
            avgLong: number
            geonameId: number
        }}
    }
