/* eslint-disable turbo/no-undeclared-env-vars */
import { existsSync, mkdirSync } from 'fs';


export type EnvConfig = {
    copyFiles: string
    databaseUploadLocation: string
    locationType: string

    copyFilesError: boolean
    databaseUploadLocationError: boolean
    locationTypeError: boolean
}


/**
 * 
 */
export const readInEnvVariables = () => {

    const config: EnvConfig = {
        copyFiles: process.env.COPY_FILES?.toLocaleUpperCase() || '',
        databaseUploadLocation: process.env.DATABASE_UPLOAD_LOCATION || '',
        locationType: process.env.LOCATION_TYPE.toLocaleUpperCase() || '',
        copyFilesError: false,
        databaseUploadLocationError: false,
        locationTypeError: false
    }

    // copyFiles can only be Y or N
    if ( !['Y', 'N'].includes(config.copyFiles)) {
        config.copyFilesError = true;
    } else if (config.copyFiles === 'N') {
        // Return if copy files is set to No, as we do not want to copy them
        return config;        
    }

    // locationType must be a valid location
    if ( !['WINDOWS', 'MAC', 'AWS', 'AZURE'].includes(config.locationType)) {
        config.locationTypeError = true
    } else {

        // databaseUploadLocation must be set and a valid path
        if (config.databaseUploadLocation.length === 0) {
            config.databaseUploadLocationError = true;
        }  else {
            
            if ( config.locationType === 'WINDOWS') {

                if (!existsSync(config.databaseUploadLocation)) {
                    mkdirSync(config.databaseUploadLocation, { recursive: true });
                }

            } else {
                throw new Error(`[ERROR] This is no setup for (${config.locationType})`)
            }
        }
    }

    // Console log the error messages
    if ( config.copyFilesError || config.databaseUploadLocationError || config.locationTypeError ) {

        console.log ('[USAGE] The following environment variables need to be defined')
        console.log ('')

        if (config.copyFilesError) {
            console.log (`COPY_FILES is (${config.copyFiles})`)
            console.log ('    Should be Y or N. Depending if you want them copied')
        }

        if (config.databaseUploadLocationError) {
            console.log (`DATABASE_UPLOAD_LOCATION is (${config.databaseUploadLocation})`)
            console.log ('    If copy files is set. This should be a valid location')
        }

        if (config.locationTypeError) {
            console.log (`LOCATION_TYPE is (${config.locationType})`)
            console.log ('    If copy files is set. This should be a valid location type (Windows / Mac / AWS / Azure)')
        }

        console.log (config)

        throw new Error ('[ERROR] Not all environment variables are defined')
    }
    return config
}