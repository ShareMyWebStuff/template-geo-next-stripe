import { resolve } from 'path';
import { STATIC_GEO_DATA, REGION_FILES, STATIC_FILES, COUNTRY_FILES } from '../config/config.js';
import { ftpFile } from '../directories/ftp-file.js';
import { unZipFile } from '../directories/unzip-file.js';
import { getDirname } from '../directories/get-dirname.js';


/**
 * Downloads the specified static files
 */
const downloadGeonameStaticFiles = async () => {

    const start = Date.now()

    const __dirname = getDirname()

    // Get the selected static files
    for ( const fileType of STATIC_FILES){

        const file = STATIC_GEO_DATA[fileType]
        if ( !file ){
            throw new Error (`[ERROR]: downloadGeonameStaticFiles fileType (${fileType}) not found`)
        }

        const ftpFileName = `${file.url}${file.remoteFilename}`
        const downloadedFileName = (file.zipped ? resolve(__dirname, 'data', 'working', 'static', 'zipped', file.remoteFilename ) : resolve(__dirname, 'data', 'working', 'static', 'unzipped', file.remoteFilename ) )

        await ftpFile ( ftpFileName, downloadedFileName )

        if ( file.zipped ) {
            const unzippedDirectory = resolve(__dirname, 'data', 'working', 'static', 'unzipped' )
            await unZipFile ( downloadedFileName, unzippedDirectory )
        }

    }

    const timeTaken = Date.now() - start;

    console.log (`> Downloaded static files (${timeTaken} ms)`)

}

/**
 * Downloads and extracts the city / postcodes files
 */
const downloadGeonameCountryFiles = async () => {

    const start = Date.now();
    const __dirname = getDirname()

    // Get the selected static files
    for ( const fileType of COUNTRY_FILES){

        const file = REGION_FILES[fileType]
        if ( !file ){
            throw new Error (`[ERROR]: downloadGeonameCountryFiles fileType (${fileType}) not found`)
        }

        const cityFile = file.find( f => f.type === 'cities')
        const partialFile = file.find( f => f.type === 'partials')
        const postcodeFile = file.find( f => f.type === 'postcodes')

        if ( cityFile ) {
            const ftpFileName = `${cityFile.url}${cityFile.remoteFilename}`
            const downloadedFileName = (cityFile.zipped ? resolve(__dirname, 'data', 'working', 'city', 'zipped', cityFile.remoteFilename ) : resolve(__dirname, 'data', 'working', 'city', 'unzipped', cityFile.remoteFilename ) )

            await ftpFile ( ftpFileName, downloadedFileName )

            if ( cityFile.zipped ) {
                const unzippedDirectory = resolve(__dirname, 'data', 'working', 'city', 'unzipped' )
                await unZipFile ( downloadedFileName, unzippedDirectory )
            }
        }

        if ( partialFile ) {
            const ftpFileName = `${partialFile.url}${partialFile.remoteFilename}`
            const downloadedFileName = (partialFile.zipped ? resolve(__dirname, 'data', 'working', 'partial', 'zipped', partialFile.remoteFilename ) : resolve(__dirname, 'data', 'working', 'partial', 'unzipped', partialFile.remoteFilename ) )

            await ftpFile ( ftpFileName, downloadedFileName )

            if ( partialFile.zipped ) {
                const unzippedDirectory = resolve(__dirname, 'data', 'working', 'partial', 'unzipped' )
                await unZipFile ( downloadedFileName, unzippedDirectory )
            }
        }

        if ( postcodeFile ) {
            const ftpFileName = `${postcodeFile.url}${postcodeFile.remoteFilename}`
            const downloadedFileName = (postcodeFile.zipped ? resolve(__dirname, 'data', 'working', 'postcode', 'zipped', postcodeFile.remoteFilename ) : resolve(__dirname, 'data', 'working', 'postcode', 'unzipped', postcodeFile.remoteFilename ) )

            await ftpFile ( ftpFileName, downloadedFileName )

            if ( postcodeFile.zipped ) {
                const unzippedDirectory = resolve(__dirname, 'data', 'working', 'postcode', 'unzipped' )
                await unZipFile ( downloadedFileName, unzippedDirectory )
            }
        }

    }

    const timeTaken = Date.now() - start;

    console.log (`> Downloaded city / postcode files (${timeTaken} ms)`)

}


/**
 * Downloads and extracts the static files followed by the city / poscodes and partials
 */
export const downloadGeonameFiles = async () => {

    await downloadGeonameStaticFiles ()

    await downloadGeonameCountryFiles ()

}

