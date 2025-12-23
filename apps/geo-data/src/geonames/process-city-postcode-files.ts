import { COUNTRY_FILES, REGION_FILES } from "../config/config.js"
import { CityList } from "../types/city.js"
import { processCityFile } from "./read-in-city-file.js"
import { processPartialFile } from "./read-in-partial-file.js"
import { processPostcodeFile } from "./read-in-postcode-file.js"

/**
 * 
 * 
 * @param geoImport 
 */
export const processCityPostcodeFiles = async ( ) => {

    // Read each value held in the country object, lists the countries we want read in
    for ( const ctryCode of COUNTRY_FILES){

        console.log (`> Process ${ctryCode} files`)

        //
        let cityList: CityList = {};

        const city = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'cities')})
        if ( !city ) {
            throw new Error (`City file does not exist for this region (${ctryCode})`)
        } else {
            cityList = await processCityFile (ctryCode)
        }

        // Read in the partial file
        const postcode = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'postcodes')})
        if ( !postcode ) {
            console.log (`    No postcode found for ${ctryCode}`)
            // return null
        } else {
            console.log (`    Process postcode file`)
            await processPostcodeFile (ctryCode, cityList)
        }

        // Read in the partial file
        const partials = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'partials')})
        if ( !partials ) {
            console.log (`    No partial postcode found for ${ctryCode}`)
            // return null
        } else {
            console.log (`    Process partials file`)
            await processPartialFile (ctryCode, cityList)
        }

        console.log (`> END rocess ${ctryCode} files`)
        console.log (COUNTRY_FILES)


    }
}