import { calcCoord } from "../calc-coord";
import { distanceBetweenCoords } from "../distance-between-coords";

describe ( "distance-between-coords.test", () => {

    describe ( "Given we run the calc-coord function", () => {

        describe ( "When we call with no parameters", () => {
            it ( 'Then we receive unset object', () => {
                // @ts-ignore
                expect(() => distanceBetweenCoords()).toThrow();
            })
        })

        describe ( "When we call with valid coords", () => {
            it ( 'Then we receive the distance between two places', () => {
                const coord1 = calcCoord ( {long: 10, lat: 10} )
                const coord2 = calcCoord ( {long: 20, lat: 20} )
                const res = distanceBetweenCoords ( coord1, coord2 )
                expect (res).toEqual(1544.7575610296099)
            })
        })

    })

})
