import { cleanUpDirectories } from './directories/cleanup-directories'
import { downloadGeonameFiles } from './geonames/download-geoname-files'
import { readInStaticFiles } from './geonames/read-in-static-files'
import { exportStaticFiles } from './export-data/export-static-files'
import { processCityPostcodeFiles } from './geonames/process-city-postcode-files'
import { StaticData } from './types/static-data.js'
import { exportCommandFile } from './export-data/export-commands.js'

/**
 * 
 * @returns 
 */
const runGeoLoad = async() => {

    const start = Date.now();
    const geoImport: StaticData = {
        'COUNTRIES': {},
    }

    try {

        // Cleanup the directories we will download the files into
        await cleanUpDirectories ()

        // Download the geoname files
        await downloadGeonameFiles ()

        // Process static files
        await readInStaticFiles ( geoImport )

        // Process region files ( city / postcodes )
        await processCityPostcodeFiles ( )

        // Export the static files
        await exportStaticFiles (geoImport)

        await exportCommandFile ()

        console.log ( 'Load data' )

    } catch (error) {
        console.log ( '[ERROR]', error )
        return false
    }

    const timeTaken = Date.now() - start;
    console.log (`> Finished Total time (${timeTaken} ms)`)

    return true

}


runGeoLoad()
.then ( () => {
    console.log ( '' )
})