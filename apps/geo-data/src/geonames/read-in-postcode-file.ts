import { resolve } from "path"
import { createReadStream } from "fs";
import readline from "readline";
import { REGION_FILE, REGION_FILES } from "../config/config.js";
import { getDirname } from "../directories/get-dirname.js";
import { PostcodeList, Postcodes, ProcessPostcode } from "../types/postcode.js";
import { exportPostcodeFile } from "../export-data/export-postcode-file.js";
import { Coord } from "../types/coord.js";
import { calcCoord } from "../util/calc-coord.js";
import { CityList } from "../types/city.js";
import { distanceBetweenCoords } from "../util/distance-between-coords.js";

/**
 * Reads in all the locations in a postcode partial file
 * 
 * @param city 
 * @returns 
 */
const loadInPostcodeFile = async ( city: REGION_FILE, regions: ProcessPostcode ) => {

    const postcodes: Postcodes[] = []

    const __dirname = getDirname()
    const fileName = resolve(__dirname, 'data', 'working', 'postcode', 'unzipped', ( city.zipped ? city.extractName! : city.remoteFilename) )

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

        postcodes.push ({
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

    return postcodes
}

/**
 * 
 * @param cities 
 */
const getUniquePostcodes = ( postcodes: Postcodes[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const postcodeCnt: { [key: string ]: {cnt: number }} = {}
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ){
            // const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
            const key = `${postcode.postcode}`
            const val = postcodeCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                postcodeCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in postcodeCnt ) {
        if ( postcodeCnt[key].cnt > 1) {
            dups[key] = { cnt: postcodeCnt[key].cnt}
        }
    }

    let noMatched = 0;
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ) {
            // const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
            const key = `${postcode.postcode}`
            if ( !dups[key] ){
                postcode.status = 'M'
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique postcodes to matched (${noMatched}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param postcodes 
 * @returns 
 */
const getPlacenameList = ( postcodes: Postcodes[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const postcodeList: PostcodeList = {}

    postcodes.forEach( postcode => {

        // Check city exists, if it doesnt then add it
        const placeExists =  postcodeList[`${postcode.placeName}`]
        if ( !placeExists ) {
            postcodeList[`${postcode.placeName}`] = {}
        }

        // Check admin region exists for city.
        //   If it doesnt create it
        //   If it does add coord to it
        const admRegion = `${postcode.adminCode1}-${postcode.adminCode2}-${postcode.adminCode3}`
        const admRegionExists =  postcodeList[`${postcode.placeName}`][`${admRegion}`]
        if ( !admRegionExists ) {
            postcodeList[`${postcode.placeName}`][`${admRegion}`] = {
                coords: [ calcCoord ({ lat: Number(postcode.latitude), long: Number(postcode.longitude)})],
                avgLat: 0,
                avgLong: 0,
                geonameId: 0
            }
        } else { 

            postcodeList[`${postcode.placeName}`][`${admRegion}`].coords.push(calcCoord ({ lat: Number(postcode.latitude), long: Number(postcode.longitude)}))
        }

    })

    const timeTaken = Date.now() - start;
    console.log (`    Get placename list in (${timeTaken} ms)`)

    return postcodeList
}



/**
 * 
 * @param postcodes 
 */
const getUniquePostcodePlacename = ( postcodes: Postcodes[] ) => {
    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const postcodeCnt: { [key: string ]: {cnt: number }} = {}
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ){
            const key = `${postcode.postcode}-${postcode.placeName}`
            const val = postcodeCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                postcodeCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in postcodeCnt ) {
        if ( postcodeCnt[key].cnt > 1) {
            dups[key] = { cnt: postcodeCnt[key].cnt}
        }
    }

    let noMatched = 0;
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ) {
            const key = `${postcode.postcode}-${postcode.placeName}`
            if ( !dups[key] ){
                postcode.status = 'M'
                postcode.searchName = postcode.placeName
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique postcode/placename to matched (${noMatched}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param postcodes 
 */
const getUniquePostcodeAdmin1 = ( postcodes: Postcodes[] ) => {
    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const postcodeCnt: { [key: string ]: {cnt: number }} = {}
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ){
            const key = `${postcode.postcode}-${postcode.adminName1}`
            const val = postcodeCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                postcodeCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in postcodeCnt ) {
        if ( postcodeCnt[key].cnt > 1) {
            dups[key] = { cnt: postcodeCnt[key].cnt}
        }
    }

    let noMatched = 0;
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ) {
            const key = `${postcode.postcode}-${postcode.adminName1}`
            if ( !dups[key] ){
                postcode.status = 'M'
                postcode.searchName = postcode.adminName1
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique postcode/admin1 to matched (${noMatched}) rows in (${timeTaken} ms)`)
}


/**
 * 
 * @param postcodes 
 */
const getUniquePostcodeAdmin2 = ( postcodes: Postcodes[] ) => {
    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const postcodeCnt: { [key: string ]: {cnt: number }} = {}
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ){
            const key = `${postcode.postcode}-${postcode.adminName2}`
            const val = postcodeCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                postcodeCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in postcodeCnt ) {
        if ( postcodeCnt[key].cnt > 1) {
            dups[key] = { cnt: postcodeCnt[key].cnt}
        }
    }

    let noMatched = 0;
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ) {
            const key = `${postcode.postcode}-${postcode.adminName2}`
            if ( !dups[key] ){
                postcode.status = 'M'
                postcode.searchName = postcode.adminName2
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique postcode/admin2 to matched (${noMatched}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param postcodes 
 */
const getUniquePostcodeAdmin3 = ( postcodes: Postcodes[] ) => {
    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const postcodeCnt: { [key: string ]: {cnt: number }} = {}
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ){
            const key = `${postcode.postcode}-${postcode.adminName3}`
            const val = postcodeCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                postcodeCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in postcodeCnt ) {
        if ( postcodeCnt[key].cnt > 1) {
            dups[key] = { cnt: postcodeCnt[key].cnt}
        }
    }

    let noMatched = 0;
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ) {
            const key = `${postcode.postcode}-${postcode.adminName3}`
            if ( !dups[key] ){
                postcode.status = 'M'
                postcode.searchName = postcode.adminName3
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique postcode/admin3 to matched (${noMatched}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param postcodes 
 */
const getUniquePostcodePlacenameAdmin3 = ( postcodes: Postcodes[] ) => {
    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const postcodeCnt: { [key: string ]: {cnt: number }} = {}
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ){
            const key = `${postcode.postcode}-${postcode.placeName}-${postcode.adminName3}`
            const val = postcodeCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                postcodeCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in postcodeCnt ) {
        if ( postcodeCnt[key].cnt > 1) {
            dups[key] = { cnt: postcodeCnt[key].cnt}
        }
    }

    let noMatched = 0;
    postcodes.forEach( postcode => {
        if ( postcode.status === 'N' ) {
            const key = `${postcode.postcode}-${postcode.placeName}-${postcode.adminName3}`
            if ( !dups[key] ){
                postcode.status = 'M'
                postcode.searchName = `${postcode.placeName}-${postcode.adminName3}`
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set unique postcode/placeName/admin3 to matched (${noMatched}) rows in (${timeTaken} ms)`)
}



/**
 * 
 * @param postcodeList 
 * @param cityList 
 */
const getClosestCityToPostcode = ( postcodeList: PostcodeList, cityList: CityList ) => {

    const start = Date.now();

    // Loop through the postcodes
    for ( const plItem in postcodeList) {

        // Find the associated placename from the postcode in the city
        const cityLookup = cityList[plItem]

        if (cityLookup ) {
            let nearestDist = 10000;
            let nearestCity = 0;

            for ( const admRegion in postcodeList[plItem]) {

                cityLookup.forEach ( city => {
                    // Default to item 0 because I need to average the array out
                    const dist = distanceBetweenCoords ( city.coord,postcodeList[plItem][admRegion].coords[0])

                    if ( nearestDist > dist ) {
                        nearestDist = dist;
                        nearestCity = city.geonameId;
                    }

                })
                if ( nearestCity === 0) {
                    console.log (`[ERROR] nearest city not found 1`)
                    throw new Error ('[ERROR] nearest city not found 1')
                } else {
                    postcodeList[plItem][admRegion].geonameId = nearestCity
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

            for ( const admRegion in postcodeList[plItem]) {

                if ( nearestCity === 0) {
                    for ( const cl in cityList) {
                        cityList[cl].forEach ( city => {
                            const dist = distanceBetweenCoords ( city.coord,postcodeList[plItem][admRegion].coords[0])

                            if ( nearestDist > dist ) {
                                nearestDist = dist;
                                nearestCity = city.geonameId;
                                coord = city.coord
                            }

                        })
                    }
                    if ( nearestCity === 0) {
                        console.log (`[ERROR] nearest city not found 2`)
                        console.log (plItem)
                        console.log (admRegion)
                        console.log (postcodeList[plItem][admRegion].geonameId)
                        console.log (postcodeList[plItem][admRegion].coords)
                        console.log (postcodeList[plItem][admRegion].avgLat)
                        console.log (postcodeList[plItem][admRegion].avgLong)
                        // throw new Error ('[ERROR] nearest city not found 2')
                    } else {
                        postcodeList[plItem][admRegion].geonameId = nearestCity

                        cityList[`${plItem}`] = [{
                            geonameId: Number(nearestCity),
                            coord
                        }]

                    }

                } else {
                    postcodeList[plItem][admRegion].geonameId = nearestCity
                }

            }
        }

    }

    const timeTaken = Date.now() - start;
    console.log (`    Closest city ($cnt) to postcode (${timeTaken} ms)`)
}

/**
 * 
 * @param postcodeList 
 * @param postcodes 
 */
const setClosestCityOnPostcode = ( postcodeList: PostcodeList, postcodes: Postcodes[] ) => {

    const start = Date.now();

    postcodes.forEach( postcode => {

        const admKey = `${postcode.adminCode1}-${postcode.adminCode2}-${postcode.adminCode3}`
        const geonameId = postcodeList[postcode.placeName][admKey].geonameId
        if ( geonameId ) {
            postcode.geonameId = geonameId;
            postcode.geonameIdSet = true;
        } else {
            console.log (`${postcode.placeName} not set.`)
        }

    })

    const timeTaken = Date.now() - start;
    console.log (`    Set closest city on postcode (${timeTaken} ms)`)

}

const processedPostcodeCount = ( postcodes: Postcodes[] ) => {

    const cnt: {[key:string]: number} = {};
    postcodes.forEach( postcode => {
        if ( !cnt[postcode.status]) {
            cnt[postcode.status] = 1
        } else {
            cnt[postcode.status] = cnt[postcode.status] + 1
        }
    })

    console.log (cnt)
}

/**
 * 
 * Loops through the static file types and read them in
 * 
 */
export const processPostcodeFile = async ( ctryCode: string, cityList: CityList ) => {

    const start = Date.now();

    const regions: ProcessPostcode = {
        errors: []
    }
    
    // Read in the city file
    const postcodeRegion = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'postcodes')})
    if ( !postcodeRegion ) {
        throw new Error (`Postcode file does not exist for this region (${ctryCode})`)
    }

    // Read in the city file
    const postcodes = await loadInPostcodeFile (postcodeRegion, regions )

    getUniquePostcodes ( postcodes )

    getUniquePostcodePlacename ( postcodes )

    getUniquePostcodeAdmin1 ( postcodes )

    getUniquePostcodeAdmin2 ( postcodes )

    getUniquePostcodeAdmin3 ( postcodes )

    getUniquePostcodePlacenameAdmin3 ( postcodes )

    const postcodeList = getPlacenameList ( postcodes )

    getClosestCityToPostcode ( postcodeList, cityList)

    setClosestCityOnPostcode ( postcodeList, postcodes )

    postcodes.forEach ( postcode => {
        if ( postcode.status === 'N' ){
            console.log (postcode)
        }
    })

    processedPostcodeCount ( postcodes )

    const __dirname = getDirname()
    const postcodeFilename = resolve(__dirname, 'data', 'latest', `postcodes-${ctryCode}.txt` )
    await exportPostcodeFile ( postcodeFilename, postcodes, true )

    const timeTaken = Date.now() - start;
    console.log (`  > Process postcode ${ctryCode} file (${timeTaken} ms)`)

    return regions;
}

