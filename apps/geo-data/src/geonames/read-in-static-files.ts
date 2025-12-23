import { resolve } from "path"
import { createReadStream } from "fs";
import readline from "readline";
import { STATIC_FILES, STATIC_GEO_DATA } from "../config/config.js"
import { getDirname } from "../directories/get-dirname.js"
import { StaticData } from "../types/static-data.js";

/**
 * 
 * @param geoImport 
 * @param fields 
 * @returns 
 */
const readInCountryFile = async ( geoImport: StaticData, fields: string[] ) => {

    // See: https://download.geonames.org/export/dump/readme.txt for field order
    // const [iso2, iso3, isoNumeric, fips, countryName, capital, area, population, continent, tld, ccyCode, currency, phone, postalCodeFormat, postalCodeRegex, languages, geonameId, neighbours, equivalentFipsCode] = fields;
    const [iso2, iso3, , , countryName, , , , , , , , , , , , geonameId, , ] = fields;
    if ( !iso2){
        console.log (`[ERROR]: readInCountryFile iso2 is undefined (${countryName}).`)
        return;
    }

    if ( !iso3){
        console.log (`[ERROR]: readInCountryFile iso3 is undefined (${countryName}).`)
        return;
    }

    if ( !countryName){
        console.log (`[ERROR]: readInCountryFile countryName is undefined (${iso2}).`)
        return;
    }

    geoImport.COUNTRIES[iso2] = {
        geonameId: Number(geonameId),
        iso2,
        iso3,
        countryName
    }

}

/**
 * 
 * Loops through the static file types and read them in
 * 
 * @param geoImport 
 */
export const readInStaticFiles = async ( geoImport: StaticData ) => {

    const start = Date.now();
    const __dirname = getDirname()

    // Get the selected static files
    for ( const fileType of STATIC_FILES){

        const file = STATIC_GEO_DATA[fileType]
        if ( !file ) {
            console.log ( `[ERROR]: readInStaticFiles fileType ${fileType} not found in STATIC_GEO_DATA`)
            return
        }
        const fileName = resolve(__dirname, 'data', 'working', 'static', 'unzipped', ( file.zipped ? file.extractName! : file.remoteFilename) )

        const fileStream = createReadStream (fileName);

        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

        for await (const line of rl) {
            if ( !line.startsWith('#') ) {
                const fields = line.split("\t");

                if ( fileType === 'COUNTRIES') {
                    readInCountryFile ( geoImport, fields )
                }

            }
        }
    }

    const timeTaken = Date.now() - start;

    console.log (`> Read in static files (${timeTaken} ms)`)
}
