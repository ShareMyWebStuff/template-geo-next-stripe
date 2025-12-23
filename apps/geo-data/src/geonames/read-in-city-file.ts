import { resolve } from "path"
import { createReadStream } from "fs";
import readline from "readline";
import { REGION_FILE, REGION_FILES } from "../config/config.js"
import { getDirname } from "../directories/get-dirname.js"
import { CityAdminSplit, CityList, CityLocations, ProcessCity } from "../types/city.js";
import { Admin1, Admin2, Admin3, Admin4 } from "../types/admin.js";
import { exportCityFile } from "../export-data/export-city-file.js";
import { calcCoord } from "../util/calc-coord.js";


/**
 * Reads in all the locations in a city file
 * 
 * @param city 
 * @returns 
 */
const readInCityFile = async (city: REGION_FILE, regions: ProcessCity ) => {

    const cityAdm: CityAdminSplit = { cities: [], admin: [] }

    const __dirname = getDirname()

    const fileName = resolve(__dirname, 'data', 'working', 'city', 'unzipped', ( city.zipped ? city.extractName! : city.remoteFilename) )

    const fileStream = createReadStream (fileName);

    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
        const fields = line.split("\t");
        const [geonameId, name, asciiName, alternateNames, latitude, longitude, featureClass, featureCode, countryCode, cc2, adminCode1, adminCode2, adminCode3, adminCode4, population, elevation, dem, timezone, modificationDate] = fields;

        if ( name === undefined || 
            asciiName === undefined || 
            alternateNames  === undefined || 
            latitude  === undefined || 
            longitude  === undefined || 
            featureClass  === undefined || 
            featureCode  === undefined || 
            countryCode  === undefined || 
            cc2  === undefined || 
            adminCode1  === undefined || 
            adminCode2  === undefined || 
            adminCode3  === undefined || 
            adminCode4  === undefined || 
            population  === undefined || 
            elevation  === undefined || 
            dem  === undefined || 
            timezone  === undefined || 
            modificationDate  === undefined ){
            regions.errors.push (`[ERROR]: loadInCityFile data is undefined (${JSON.stringify(fields)})`)
            continue;
        }


        // Save the data into temp admin / city locations.
        if (
            ( featureClass === 'A' && ['ADM1', 'ADM2', 'ADM3', 'ADM4'].includes(featureCode) )
        ){

            cityAdm.admin.push ({
                geonameId: Number(geonameId), 
                name, 
                searchName: name,
                latitude, 
                longitude, 
                featureClass, 
                featureCode, 
                countryCode, 
                cc2, 
                adminCode1, 
                adminCode2, 
                adminCode3, 
                adminCode4, 
                modificationDate: new Date (modificationDate),
                status: 'N'
            })
        } else if ( featureClass === 'P' ) {

            // P.PPL	populated place	a city, town, village, or other agglomeration of buildings where people live and work
            // P.PPLA	seat of a first-order administrative division	seat of a first-order administrative division (PPLC takes precedence over PPLA)
            // P.PPLA2	seat of a second-order administrative division	
            // P.PPLA3	seat of a third-order administrative division	
            // P.PPLA4	seat of a fourth-order administrative division	
            // P.PPLA5	seat of a fifth-order administrative division	
            // P.PPLC	capital of a political entity	
            // P.PPLCH	historical capital of a political entity	a former capital of a political entity
            // P.PPLF	farm village	a populated place where the population is largely engaged in agricultural activities
            // P.PPLG	seat of government of a political entity	
            // P.PPLH	historical populated place	a populated place that no longer exists
            // P.PPLL	populated locality	an area similar to a locality but with a small group of dwellings or other buildings
            // P.PPLQ	abandoned populated place	
            // P.PPLR	religious populated place	a populated place whose population is largely engaged in religious occupations
            // P.PPLS	populated places	cities, towns, villages, or other agglomerations of buildings where people live and work
            // P.PPLW	destroyed populated place	a village, town or city destroyed by a natural disaster, or by war
            // P.PPLX	section of populated place	

            cityAdm.cities.push ({
                geonameId: Number(geonameId), 
                name, 
                searchName: name,
                latitude, 
                longitude, 
                featureClass, 
                featureCode, 
                countryCode, 
                cc2, 
                adminCode1, 
                adminCode2, 
                adminCode3, 
                adminCode4, 
                modificationDate: new Date (modificationDate),
                status: 'N'
            })
        }
    }

    return cityAdm;
}

/**
 * Get the admin 1 region from the city file locations
 * @param regions 
 * @param ctryCode 
 * @returns 
 */
const getAdmin1 = ( regions: ProcessCity, admin: CityLocations[] ) => {

    const start = Date.now();

    admin.forEach ( loc => {

        const { geonameId, featureClass, featureCode, name, adminCode1  } = loc;
        if ( featureClass === 'A' && featureCode === 'ADM1') {

            regions.admin1.push ({
                geonameId: Number(geonameId),
                region: name,
                adminCode1: adminCode1,
            } )
        }

    })

    const timeTaken = Date.now() - start;
    console.log (`    Admin 1 (${timeTaken} ms)`)

}

/**
 * Get the admin 2 region from the city file locations
 * @param regions 
 * @param ctryCode 
 * @returns 
 */
const getAdmin2 = ( regions: ProcessCity, admin: CityLocations[] ) => {

    const start = Date.now();
    admin.forEach ( loc => {

        const { geonameId, featureClass, featureCode, name, adminCode1, adminCode2 } = loc;

        if ( featureClass === 'A' && featureCode === 'ADM2') {

            const admin1Ptr = regions.admin1.find( adm => adm.adminCode1 === adminCode1)

            if ( !admin1Ptr ) {
                regions.errors.push (`Cities. Admin code 2.1 (${name}-${adminCode1}) does not exist`)
            }

            regions.admin2.push ({
                geonameId: Number(geonameId),
                region: name,
                adminCode1,
                adminCode2,
                adminPtr1: admin1Ptr,
            } )
        } 

    })
    const timeTaken = Date.now() - start;
    console.log (`    Admin 2 (${timeTaken} ms)`)

}


/**
 * Get the admin 3 region from the city file locations
 * @param regions 
 * @param ctryCode 
 * @returns 
 */
const getAdmin3 = ( regions: ProcessCity, admin: CityLocations[] ) => {

    const start = Date.now();
    admin.forEach ( loc => {

        const { geonameId, featureClass, featureCode, name, adminCode1, adminCode2, adminCode3 } = loc;

        if ( featureClass === 'A' && featureCode === 'ADM3') {

            // console.log (JSON.stringify (loc))

            const adminPtr1 = regions.admin1.find( adm => adm.adminCode1 === adminCode1)
            const adminPtr2 = regions.admin2.find( adm => adm.adminCode2 === adminCode2)

            if ( !adminPtr1 ) {
                regions.errors.push (`Cities. Admin code 3.1 (${name}-${adminCode1}) does not exist`)
                // throw new Error(`3. Admin code 1 (${name}-${adminCode1}) does not exist`);
            }

            if ( !adminPtr2 ) {
                regions.errors.push (`Cities. Admin code 3.2 (${name}-${adminCode1}-${adminCode2}) does not exist`)
                // throw new Error(`3. Admin code 2 (${name}-${adminCode1}-${adminCode2}) does not exist`);
            }

            regions.admin3.push ({
                geonameId: Number(geonameId),
                region: name,
                adminCode1,
                adminCode2,
                adminCode3,
                adminPtr1,
                adminPtr2,
            } )
        } 

    })
    const timeTaken = Date.now() - start;
    console.log (`    Admin 3 (${timeTaken} ms)`)

}

/**
 * Get the admin 4 region from the city file locations
 * @param regions 
 * @param ctryCode 
 * @returns 
 */
const getAdmin4 = ( regions: ProcessCity, admin: CityLocations[] ) => {

    const start = Date.now();
    admin.forEach ( loc => {

        const { geonameId, featureClass, featureCode, name, adminCode1, adminCode2, adminCode3, adminCode4 } = loc;

        if ( ( featureClass === 'A' && featureCode === 'ADM4')) {

            const adminPtr1 = regions.admin1.find( adm => adm.adminCode1 === adminCode1)
            const adminPtr2 = regions.admin2.find( adm => adm.adminCode2 === adminCode2)
            const adminPtr3 = regions.admin3.find( adm => adm.adminCode3 === adminCode3)

            if ( !adminPtr1 ) {
                regions.errors.push (`Cities. Admin code 4.1 (${name}-${adminCode1}) does not exist`)
                // throw new Error(`4. Admin code 1 (${name}-${adminCode1}) does not exist`);
            }

            if ( !adminPtr2 ) {
                regions.errors.push (`Cities. Admin code 4.2 (${name}-${adminCode1}-${adminCode2}) does not exist`)
                // throw new Error(`4. Admin code 2 (${name}-${adminCode1}-${adminCode2}) does not exist`);
            }

            if ( !adminPtr3 ) {
                regions.errors.push (`Cities. Admin code 4.3 (${name}-${adminCode1}-${adminCode2}-${adminCode3}) does not exist`)
                // throw new Error(`4. Admin code 3 (${name}-${adminCode1}-${adminCode2}-${adminCode3}) does not exist`);
            }

            regions.admin4.push ({
                geonameId: Number(geonameId),
                region: name,
                adminCode1,
                adminCode2,
                adminCode3,
                adminCode4,
                adminPtr1,
                adminPtr2,
                adminPtr3,
            } )
        } 
    })
    const timeTaken = Date.now() - start;
    console.log (`    Admin 4 (${timeTaken} ms)`)

}

/**
 * 
 * @param cities 
 */
const getDuplicateCitiesOnModifiedDate = ( cities: CityLocations[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const cityCnt: { [key: string ]: {cnt: number, lastModificationDate: Date }} = {}
    cities.forEach( city => {
        if ( city.status === 'N' ){
            const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
            const val = cityCnt[key]
            if ( val ) {
                val.cnt++
                if ( val.lastModificationDate < city.modificationDate) {
                    val.lastModificationDate = new Date(city.modificationDate)
                }
            } else {
                cityCnt[key] = {cnt: 1, lastModificationDate: new Date(city.modificationDate)}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number, lastModificationDate: Date }} = {}
    for ( const key in cityCnt ) {
        if ( cityCnt[key].cnt > 1) {
            dups[key] = { cnt: cityCnt[key].cnt, lastModificationDate: new Date(cityCnt[key].lastModificationDate)}
        }
    }

    // Set the duplicates to deleted
    let noDups = 0;
    cities.forEach( city => {
        const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
        if ( dups[key] ){
            if (dups[key].lastModificationDate > city.modificationDate ) {
                city.status = 'D'
                noDups++
            }
        }
    })

    // console.log (noDups)
    const timeTaken = Date.now() - start;
    console.log (`    Removed duplicates modified_date (${noDups}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const getDuplicateCitiesOnGeonameId = ( cities: CityLocations[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const cityCnt: { [key: string ]: {cnt: number, geonameId: number }} = {}
    cities.forEach( city => {
        if ( city.status === 'N' ){
            const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
            const val = cityCnt[key]
            if ( val ) {
                val.cnt++
                if ( val.geonameId < city.geonameId) {
                    val.geonameId = city.geonameId
                }
            } else {
                cityCnt[key] = {cnt: 1, geonameId: city.geonameId}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number, geonameId: number }} = {}
    for ( const key in cityCnt ) {
        if ( cityCnt[key].cnt > 1) {
            dups[key] = { cnt: cityCnt[key].cnt, geonameId: cityCnt[key].geonameId}
        }
    }

    // Set the duplicates to deleted
    let noDups = 0;
    cities.forEach( city => {
        const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
        if ( dups[key] ){
            if (dups[key].geonameId > city.geonameId ) {
                city.status = 'D'
                noDups++
            }
        }
    })

    // console.log (noDups)
    const timeTaken = Date.now() - start;
    console.log (`    Removed duplicates geonameid (${noDups}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const setCitiesToMatchedOnName = ( cities: CityLocations[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const cityCnt: { [key: string ]: {cnt: number }} = {}
    cities.forEach( city => {
        if ( city.status === 'N' ){
            // const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
            const key = `${city.searchName}`
            const val = cityCnt[key]
            if ( val ) {
                val.cnt++
            } else {
                cityCnt[key] = {cnt: 1}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number }} = {}
    for ( const key in cityCnt ) {
        if ( cityCnt[key].cnt > 1) {
            dups[key] = { cnt: cityCnt[key].cnt}
        }
    }

    // Set the duplicates to deleted
    let noMatched = 0;
    cities.forEach( city => {
        if ( city.status === 'N' ) {
            // const key = `${city.searchName}-${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}`
            const key = `${city.searchName}`
            if ( !dups[key] ){
                city.status = 'M'
                noMatched++
            }
        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Set cities to matched (${noMatched}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const setCitiesToMatchedOnAdmin1 = ( admin1: Admin1[], cities: CityLocations[] ) => {

    const start = Date.now();

    let cnt = 0;
    cities.forEach( city => {

        // Only deal with unprocessed cities
        if ( city.status === 'N'  && city.adminCode1 !== '' ){

            const adm = admin1.find ( adm => adm.adminCode1 === city.adminCode1 )

            if ( adm ) {
                city.searchName = `${city.name} ( ${adm.region} )`
                cnt++;
            } else {
                console.log (`Admin 1 (${city.adminCode1}) not found`)
            }

        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Cities using admin 1 (${cnt}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const setCitiesToMatchedOnAdmin2 = ( admin2: Admin2[], cities: CityLocations[] ) => {

    const start = Date.now();

    let cnt = 0;
    cities.forEach( city => {

        // Only deal with unprocessed cities
        if ( city.status === 'N' && city.adminCode1 !== '' && city.adminCode2 !== '' ){

            const adm = admin2.find ( adm => adm.adminCode1 === city.adminCode1 && adm.adminCode2 === city.adminCode2 )

            if ( adm ) {
                city.searchName = `${city.name} ( ${adm.region} )`
                cnt++;
            } else {
                console.log (`Admin 2 (${city.adminCode1}-${city.adminCode2}) not found`)
            }

        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Cities using admin 2 (${cnt}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const setCitiesToMatchedOnAdmin3 = ( admin3: Admin3[], cities: CityLocations[] ) => {

    const start = Date.now();

    let cnt = 0;
    cities.forEach( city => {

        // Only deal with unprocessed cities
        if ( city.status === 'N'  && city.adminCode1 !== '' && city.adminCode2 !== '' && city.adminCode3 !== '' ){

            const adm = admin3.find ( adm => adm.adminCode1 === city.adminCode1 && adm.adminCode2 === city.adminCode2 && adm.adminCode3 === city.adminCode3 )

            if ( adm ) {
                city.searchName = `${city.name} ( ${adm.region} )`
                cnt++;
            } else {
                console.log (`Admin 3 (${city.adminCode1}-${city.adminCode2}-${city.adminCode3}) not found`)
            }

        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Cities using admin 3 (${cnt}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const setCitiesToMatchedOnAdmin4 = ( admin4: Admin4[], cities: CityLocations[] ) => {

    const start = Date.now();

    let cnt = 0;
    cities.forEach( city => {

        // Only deal with unprocessed cities
        if ( city.status === 'N' && city.adminCode1 !== '' && city.adminCode2 !== '' && city.adminCode3 !== '' && city.adminCode4 !== '' ){

            const adm = admin4.find ( adm => adm.adminCode1 === city.adminCode1 && adm.adminCode2 === city.adminCode2 && adm.adminCode3 === city.adminCode3 && adm.adminCode4 === city.adminCode4 )

            if ( adm ) {
                city.searchName = `${city.name} ( ${adm.region} )`
                cnt++;
            } else {
                console.log (`Admin 4 (${city.adminCode1}-${city.adminCode2}-${city.adminCode3}-${city.adminCode4}) not found`)
            }

        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Cities using admin 4 (${cnt}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const setCitiesToMatchedOnAdmin12 = ( admin1: Admin1[], admin2: Admin2[], cities: CityLocations[] ) => {

    const start = Date.now();

    let cnt = 0;
    cities.forEach( city => {

        // Only deal with unprocessed cities
        if ( city.status === 'N'  && city.adminCode1 !== '' && city.adminCode2 !== '' ){

            const adm1 = admin1.find ( adm => adm.adminCode1 === city.adminCode1 )
            const adm2 = admin2.find ( adm => adm.adminCode1 === city.adminCode1 && adm.adminCode2 === city.adminCode2 )

            if ( adm1 && adm2 ) {
                city.searchName = `${city.name} ( ${adm1.region}-${adm2.region} )`
                cnt++;
            } else if ( !adm1 ) {
                console.log (`Admin 1 (${city.adminCode1}) not found`)
            } else if ( !adm2 ) {
                console.log (`Admin 2 (${city.adminCode2}) not found`)
            }

        }
    })

    const timeTaken = Date.now() - start;
    console.log (`    Cities using admin 1 (${cnt}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const getFinalDuplicateCitiesOnModifiedDate = ( cities: CityLocations[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const cityCnt: { [key: string ]: {cnt: number, lastModificationDate: Date }} = {}
    cities.forEach( city => {
        if ( city.status === 'N' ){
            const key = `${city.name}`
            const val = cityCnt[key]
            if ( val ) {
                val.cnt++
                if ( val.lastModificationDate < city.modificationDate) {
                    val.lastModificationDate = new Date(city.modificationDate)
                }
            } else {
                cityCnt[key] = {cnt: 1, lastModificationDate: new Date(city.modificationDate)}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number, lastModificationDate: Date }} = {}
    for ( const key in cityCnt ) {
        if ( cityCnt[key].cnt > 1) {
            dups[key] = { cnt: cityCnt[key].cnt, lastModificationDate: new Date(cityCnt[key].lastModificationDate)}
        }
    }

    // Set the duplicates to deleted
    let noDups = 0;
    cities.forEach( city => {
        const key = `${city.name}`
        if ( dups[key] ){
            if (dups[key].lastModificationDate > city.modificationDate ) {
                city.status = 'D'
                noDups++
            }
        }
    })

    // console.log (noDups)
    const timeTaken = Date.now() - start;
    console.log (`    Removed final duplicates modified_date (${noDups}) rows in (${timeTaken} ms)`)
}

/**
 * 
 * @param cities 
 */
const getFinalDuplicateCitiesOnGeonameId = ( cities: CityLocations[] ) => {

    const start = Date.now();
    
    // Loop through the cities and count the unique names
    const cityCnt: { [key: string ]: {cnt: number, geonameId: number }} = {}
    cities.forEach( city => {
        if ( city.status === 'N' ){
            const key = `${city.name}`
            const val = cityCnt[key]
            if ( val ) {
                val.cnt++
                if ( val.geonameId < city.geonameId) {
                    val.geonameId = city.geonameId
                }
            } else {
                cityCnt[key] = {cnt: 1, geonameId: city.geonameId}
            }
        }
    })

    // Create an object of duplicates
    const dups: { [key: string ]: {cnt: number, geonameId: number }} = {}
    for ( const key in cityCnt ) {
        if ( cityCnt[key].cnt > 1) {
            dups[key] = { cnt: cityCnt[key].cnt, geonameId: cityCnt[key].geonameId}
        }
    }

    // Set the duplicates to deleted
    let noDups = 0;
    cities.forEach( city => {
        const key = `${city.name}`
        if ( dups[key] ){
            if (dups[key].geonameId > city.geonameId ) {
                city.status = 'D'
                noDups++
            }
        }
    })

    // console.log (noDups)
    const timeTaken = Date.now() - start;
    console.log (`    Removed duplicates geonameid (${noDups}) rows in (${timeTaken} ms)`)
}



const processedCount = ( cities: CityLocations[] ) => {

    const cnt: {[key:string]: number} = {};
    cities.forEach( city => {
        if ( !cnt[city.status]) {
            cnt[city.status] = 1
        } else {
            cnt[city.status] = cnt[city.status] + 1
        }
    })

    console.log (cnt)
}


const getCityList = ( cities: CityLocations[] ) => {

    const start = Date.now();

    const cityList: CityList = {};
    cities.forEach( city => {

        // Check city exists, if it doesnt then add it
        const placeExists =  cityList[`${city.name}`]
        if ( !placeExists ) {
            cityList[`${city.name}`] = [{
                geonameId: Number(city.geonameId),
                coord: calcCoord ({ lat: Number(city.latitude), long: Number(city.longitude) })
            }]
        } else {
            cityList[`${city.name}`].push({
                geonameId: Number(city.geonameId),
                coord: calcCoord ({ lat: Number(city.latitude), long: Number(city.longitude) })
            })
        }

    })

    const timeTaken = Date.now() - start;
    console.log (`    Get city list (${timeTaken} ms)`)

    return cityList
}




/**
 * 
 * Loops through the static file types and read them in
 * 
 * @param geoImport 
 */
export const processCityFile = async ( ctryCode: string ) => {

    const start = Date.now();

    // 
    const regions: ProcessCity = {
        admin1: [],
        admin2: [],
        admin3: [],
        admin4: [],
        errors: []
    }
    
    // Read in the city file
    const cityRegion = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'cities')})
    if ( !cityRegion ) {
        throw new Error (`City file does not exist for this region (${ctryCode})`)
    }

    // Read in the city file
    const cityAdm = await readInCityFile (cityRegion, regions )

    // Get the admin 1
    getAdmin1 ( regions, cityAdm.admin)

    // Get the admin 2
    getAdmin2 ( regions, cityAdm.admin)

    // Get the admin 3
    getAdmin3 ( regions, cityAdm.admin)

    // Get the admin 4
    getAdmin4 ( regions, cityAdm.admin)

    getDuplicateCitiesOnModifiedDate (cityAdm.cities)

    getDuplicateCitiesOnGeonameId  (cityAdm.cities)

    setCitiesToMatchedOnName (cityAdm.cities)

    setCitiesToMatchedOnAdmin1 (regions.admin1, cityAdm.cities)

    setCitiesToMatchedOnName (cityAdm.cities)

    setCitiesToMatchedOnAdmin2 (regions.admin2, cityAdm.cities)

    setCitiesToMatchedOnName (cityAdm.cities)

    setCitiesToMatchedOnAdmin3 (regions.admin3, cityAdm.cities)

    setCitiesToMatchedOnName (cityAdm.cities)

    setCitiesToMatchedOnAdmin4 (regions.admin4, cityAdm.cities)

    setCitiesToMatchedOnName (cityAdm.cities)

    setCitiesToMatchedOnAdmin12 ( regions.admin1, regions.admin2, cityAdm.cities )

    setCitiesToMatchedOnName (cityAdm.cities)

    getFinalDuplicateCitiesOnModifiedDate (cityAdm.cities)

    getFinalDuplicateCitiesOnGeonameId  (cityAdm.cities)

    setCitiesToMatchedOnName (cityAdm.cities)

    processedCount ( cityAdm.cities )

    const __dirname = getDirname()
    const cityFilename = resolve(__dirname, 'data', 'latest', `cities-${ctryCode}.txt` )
    await exportCityFile ( cityFilename, cityAdm.cities, true )

    cityAdm.cities.forEach ( city => {
        if ( city.status === 'N' ){
            console.log (city)
        }
    })

    // cityAdm.cities.forEach ( city => {
    //     if ( city.adminCode4 === '36UF120' ){
    //         console.log (city)
    //     }
    // })

    const cityList = getCityList ( cityAdm.cities )

    const timeTaken = Date.now() - start;
    console.log (`  > Process city ${ctryCode} file (${timeTaken} ms)`)

    return cityList;
}

