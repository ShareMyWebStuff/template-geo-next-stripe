import { writeFile } from "fs/promises";
import { resolve } from "path";
import { STATIC_FILES } from "../config/config.js";
import { getDirname } from "../directories/get-dirname.js";
import { StaticData } from "../types/static-data.js";

/**
 * Exports the country data to the country 
 * @param geoImport 
 */
const exportCountryFile = async ( geoImport: StaticData) => {

    const __dirname = getDirname()
    const filename = resolve(__dirname, 'data', 'latest', 'countries.txt' )

    const data = Object.values(geoImport.COUNTRIES).map ( ctry => Object.values(ctry).join('\t') ).join('\n')

    await writeFile(filename, data + '\n');
}

/**
 * Loops through all the static files and exports each one
 * 
 * @param geoImport 
 */
export const exportStaticFiles = async ( geoImport: StaticData ) => {

    const start = Date.now();

    // Get the selected static files
    for ( const fileType of STATIC_FILES){

        if ( fileType === 'COUNTRIES') {
            await exportCountryFile ( geoImport )
        }

    }

    const timeTaken = Date.now() - start;

    console.log (`Export static files (${timeTaken} ms)`)
}
