import { resolve } from "path"
import { createReadStream } from "fs";
import readline from "readline";
import { REGION_FILE, REGION_FILES } from "../config/config.js";
import { getDirname } from "../directories/get-dirname.js";
import { PartialList, Partials, ProcessPartials } from "../types/partials.js";
import { exportPartialFile } from "../export-data/export-partial-file.js";
import { CityList } from "../types/city.js";
import { calcCoord } from "../util/calc-coord.js";
import { distanceBetweenCoords } from "../util/distance-between-coords.js";
import { Coord } from "../types/coord.js";

/**
 * Reads in all the locations in a postcode partial file
 * 
 * @param city 
 * @returns 
 */
const loadInPartialFile = async ( city: REGION_FILE, regions: ProcessPartials ) => {

    const partials: Partials[] = []

    const __dirname = getDirname()
    const fileName = resolve(__dirname, 'data', 'working', 'partial', 'unzipped', ( city.zipped ? city.extractName! : city.remoteFilename) )

    const fileStream = createReadStream (fileName);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    for await (const line of rl) {
        const fields = line.split("\t");
        const [ countryCode, postcode, placeName, adminName1, adminCode1, adminName2, adminCode2, adminName3, adminCode3, latitude, longitude,  ] = fields;

        if ( countryCode  === undefined || 
            postcode === undefined || 
            placeName === undefined || 
            adminCode1  === undefined || 
            adminCode2  === undefined || 
            adminCode3  === undefined || 
            adminName1  === undefined || 
            adminName2  === undefined || 
            adminName3  === undefined || 
            latitude  === undefined || 
            longitude  === undefined ){
            regions.errors.push (`[ERROR]: loadInCityFile data is undefined (${JSON.stringify(fields)})`)
            continue;
        }

        partials.push ({
            countryCode,
            postcode,
            placeName,
            searchName: '',
            adminName1,
            adminCode1,
            adminName2,
            adminCode2,
            adminName3,
            adminCode3,
            latitude,
            longitude,
            status: 'N',
            geonameIdSet: false,
            geonameId: 0
        })

    }

    return partials
}

/**
 * 
 * @param cities 
 */
const getUniquePartials = ( partials: Partials[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const partialCnt: { [key: string ]: {cnt: number }} = {}
    partials.forEach( partial => {
        if ( partial.status === 'N' ){
            // const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
            const key = `${partial.postcode}`
            const val = partialCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                partialCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in partialCnt ) {
        if ( partialCnt[key].cnt > 1) {
            dups[key] = { cnt: partialCnt[key].cnt}
        }
    }

    let noMatched = 0;
    partials.forEach( partial => {
        if ( partial.status === 'N' ) {
            const key = `${partial.postcode}`
            if ( !dups[key] ){
                partial.status = 'M'
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique partials to matched (${noMatched}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const getUniquePartialPlacename = ( partials: Partials[] ) => {
    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const partialCnt: { [key: string ]: {cnt: number }} = {}
    partials.forEach( partial => {
        if ( partial.status === 'N' ){
            const key = `${partial.postcode}-${partial.placeName}`
            const val = partialCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                partialCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in partialCnt ) {
        if ( partialCnt[key].cnt > 1) {
            dups[key] = { cnt: partialCnt[key].cnt}
        }
    }

    let noMatched = 0;
    partials.forEach( partial => {
        if ( partial.status === 'N' ) {
            const key = `${partial.postcode}-${partial.placeName}`
            if ( !dups[key] ){
                partial.status = 'M'
                partial.searchName = partial.placeName
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique partial/placename to matched (${noMatched}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param postcodes 
 * @returns 
 */
const getPlacenameList = ( partials: Partials[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const partialsList: PartialList = {}

    partials.forEach( partials => {

        // Check city exists, if it doesnt then add it
        const placeExists =  partialsList[`${partials.placeName}`]
        if ( !placeExists ) {
            partialsList[`${partials.placeName}`] = {}
        }

        // Check admin region exists for city.
        //   If it doesnt create it
        //   If it does add coord to it
        const admRegion = `${partials.adminCode1}-${partials.adminCode2}-${partials.adminCode3}`
        const admRegionExists =  partialsList[`${partials.placeName}`][`${admRegion}`]
        if ( !admRegionExists ) {
            partialsList[`${partials.placeName}`][`${admRegion}`] = {
                coords: [ calcCoord ({ lat: Number(partials.latitude), long: Number(partials.longitude)})],
                avgLat: 0,
                avgLong: 0,
                geonameId: 0
            }
        } else { 

            partialsList[`${partials.placeName}`][`${admRegion}`].coords.push(calcCoord ({ lat: Number(partials.latitude), long: Number(partials.longitude)}))
        }

    })

    const timeTaken = Date.now() - start;
    console.log (`    Get placename list in (${timeTaken} ms)`)

    return partialsList
}

/**
 * 
 * @param partialList 
 * @param cityList 
 */
const getClosestCityToPartial = ( partialList: PartialList, cityList: CityList ) => {

    const start = Date.now();

    // Loop through the partials
    for ( const plItem in partialList) {

        // Find the associated placename from the postcode in the city
        const cityLookup = cityList[plItem]

        if (cityLookup ) {
            let nearestDist = 10000;
            let nearestCity = 0;

            for ( const admRegion in partialList[plItem]) {

                cityLookup.forEach ( city => {
                    // Default to item 0 because I need to average the array out
                    const dist = distanceBetweenCoords ( city.coord,partialList[plItem][admRegion].coords[0])

                    if ( nearestDist > dist ) {
                        nearestDist = dist;
                        nearestCity = city.geonameId;
                    }

                })
                if ( nearestCity === 0) {
                    console.log (`[ERROR] nearest city not found`)
                    throw new Error ('[ERROR] nearest city not found')
                } else {
                    partialList[plItem][admRegion].geonameId = nearestCity
                }
            }

        } else {

            let nearestDist: number = 10000;
            let nearestCity: number = 0;
            let coord: Coord = {
                lat: 0,
                long: 0,
                cosVal: 0
            }

            for ( const admRegion in partialList[plItem]) {

                if ( nearestCity === 0) {
                    for ( const cl in cityList) {
                        cityList[cl].forEach ( city => {
                            const dist = distanceBetweenCoords ( city.coord,partialList[plItem][admRegion].coords[0])

                            if ( nearestDist > dist ) {
                                nearestDist = dist;
                                nearestCity = city.geonameId;
                                coord = city.coord
                            }

                        })
                    }
                    if ( nearestCity === 0) {
                        console.log (`[ERROR] nearest city not found`)
                        throw new Error ('[ERROR] nearest city not found')
                    } else {
                        partialList[plItem][admRegion].geonameId = nearestCity

                        cityList[`${plItem}`] = [{
                            geonameId: Number(nearestCity),
                            coord
                        }]

                    }

                } else {
                    partialList[plItem][admRegion].geonameId = nearestCity
                }

            }
        }

    }

    const timeTaken = Date.now() - start;
    console.log (`    Closest city ($cnt) to partials (${timeTaken} ms)`)
}

/**
 * 
 * @param partialList 
 * @param partials 
 */
const setClosestCityOnPartial = ( partialList: PartialList, partials: Partials[] ) => {

    const start = Date.now();

    partials.forEach( partial => {

        const admKey = `${partial.adminCode1}-${partial.adminCode2}-${partial.adminCode3}`
        const geonameId = partialList[partial.placeName][admKey].geonameId
        if ( geonameId ) {
            partial.geonameId = geonameId;
            partial.geonameIdSet = true;
        } else {
            console.log (`${partial.placeName} not set.`)
        }

    })

    const timeTaken = Date.now() - start;
    console.log (`    Set closest city on partial (${timeTaken} ms)`)

}


/**
 * 
 * @param partials 
 */
const processedPartialCount = ( partials: Partials[] ) => {

    const cnt: {[key:string]: number} = {};
    partials.forEach( partial => {
        if ( !cnt[partial.status]) {
            cnt[partial.status] = 1
        } else {
            cnt[partial.status] = cnt[partial.status] + 1
        }
    })

    console.log (cnt)
}

/**
 * 
 * Loops through the static file types and read them in
 * 
 */
export const processPartialFile = async ( ctryCode: string, cityList: CityList ) => {

    const start = Date.now();

    const regions: ProcessPartials = {
        errors: []
    }
    
    // Read in the city file
    const partialRegion = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'partials')})
    if ( !partialRegion ) {
        throw new Error (`Partial file does not exist for this region (${ctryCode})`)
    }

    // Read in the city file
    const partials = await loadInPartialFile (partialRegion, regions )

    getUniquePartials ( partials )

    getUniquePartialPlacename ( partials )

    const postcodeList = getPlacenameList ( partials )

    getClosestCityToPartial ( postcodeList, cityList)

    setClosestCityOnPartial ( postcodeList, partials )

    processedPartialCount ( partials )



    // getUniquePartials ( partials )

    // getUniquePartialPlacename ( partials )

    // processedPartialCount ( partials )

    partials.forEach ( partial => {
        if ( partial.status === 'N' ){
            console.log (partial)
        }
    })

    const __dirname = getDirname()
    const partialFilename = resolve(__dirname, 'data', 'latest', `partials-${ctryCode}.txt` )
    await exportPartialFile ( partialFilename, partials, true )

    const timeTaken = Date.now() - start;
    console.log (`  > Process partial ${ctryCode} file (${timeTaken} ms)`)

    return regions;
}

