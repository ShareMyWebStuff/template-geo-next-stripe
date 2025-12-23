import { Coord } from "../types/coord.js";

export const distanceBetweenCoords = ( coord1: Coord, coord2: Coord) => {
    const R = 6371; // Earth's radius
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad( coord2.lat - coord1.lat);
    const dLon = toRad( coord2.long - coord1.long);

    const a =
        Math.sin(dLat / 2) ** 2 +
        coord1.cosVal *
        coord2.cosVal *
        Math.sin(dLon / 2) ** 2;

    const c = Math.abs(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));

    return R * c;
}
