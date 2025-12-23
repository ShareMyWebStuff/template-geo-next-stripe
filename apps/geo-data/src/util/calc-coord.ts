import { Coord } from "../types/coord.js";

/**
 * Takes a longitude and latitude
 * 
 * @param param0 
 * @returns 
 */
export const calcCoord = ({long, lat}: {long: number; lat: number}) => {

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const coord: Coord = {
        long,
        lat,
        cosVal: Math.cos(toRad( lat ))
    }
    return coord;

}
