import { calcCoord } from "../calc-coord";

describe ( "calc-coord.test", () => {

    describe ( "Given we call execute the calc-coord function", () => {

        describe ( "When we call with no parameters", () => {
            it ( 'Then we receive unset object', () => {
                // @ts-ignore
                const res = calcCoord ({});
                expect (res).toEqual({"cosVal": NaN, "lat": undefined, "long": undefined})
            })
        })

        describe ( "When we call with valid parameters", () => {
            it ( 'Then we receive unset object', () => {
                const res = calcCoord ({long: 10.0, lat: 10.0 });
                expect (res).toEqual({"cosVal": 0.984807753012208, "lat": 10.0, "long": 10.0})
            })
        })

        describe ( "When we call with long / lat equal to 0", () => {
            it ( 'Then we receive unset object', () => {
                const res = calcCoord ({long: 0, lat: 0 });
                expect (res).toEqual({"cosVal": 1, "lat": 0, "long": 0})
            })
        })

        describe ( "When we call with lat over 90", () => {
            it ( 'Then we receive unset object', () => {
                const res = calcCoord ({long: 0, lat: 91 });
                expect (res).toEqual({"cosVal": -0.017452406437283477, "lat": 91, "long": 0})
            })
        })

        describe ( "When we call with longitude over 180", () => {
            it ( 'Then we receive unset object', () => {
                const res = calcCoord ({long: 200, lat: 0 });
                expect (res).toEqual({"cosVal": 1, "lat": 0, "long": 200})
            })
        })

    })

})
