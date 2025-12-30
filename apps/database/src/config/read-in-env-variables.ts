/* eslint-disable turbo/no-undeclared-env-vars */
import { existsSync, mkdirSync } from 'fs';


export type EnvConfig = {

    database: string
    host: string
    user: string
    password: string
    databaseUploadLocation: string
    locationType: string

    databaseError: boolean
    hostError: boolean
    userError: boolean
    passwordError: boolean
    databaseUploadLocationError: boolean
    locationTypeError: boolean
}


/**
 * 
 */
export const readInEnvVariables = () => {

    const config: EnvConfig = {

        database: process.env.DB_DATABASE || '',
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        databaseUploadLocation: process.env.DATABASE_UPLOAD_LOCATION || '',
        locationType: process.env.LOCATION_TYPE || '',

        databaseError: !process.env.DB_DATABASE,
        hostError: !process.env.DB_HOST,
        userError: !process.env.DB_USER,
        passwordError: !process.env.DB_PASSWORD,
        databaseUploadLocationError: false,
        locationTypeError: false
    }

    config.locationType = config.locationType.toLocaleUpperCase()

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
                    throw new Error(`[ERROR] The databaseUploadLOocation does not exist (${config.locationType})`)
                }

            } else {
                throw new Error(`[ERROR] This is no setup for (${config.locationType})`)
            }
        }
    }

    // Console log the error messages
    if ( config.databaseError || config.hostError || config.userError  || config.passwordError || config.databaseUploadLocationError || config.locationTypeError ) {

        console.log ('[USAGE] The following environment variables need to be defined')
        console.log ('')

        if (config.databaseError) {
            console.log (`DB_DATABASE (${config.database}) - should be the database name`)
        }

        if (config.hostError) {
            console.log (`DB_HOST (${config.host}) - should be the host name`)
        }

        if (config.userError) {
            console.log (`DB_USER (${config.user}) - should be the database user name`)
        }

        if (config.passwordError) {
            console.log (`DB_PASSWORD (${config.password}) - should be the database password`)
        }

        if (config.databaseUploadLocationError) {
            console.log (`DATABASE_UPLOAD_LOCATION (${config.databaseUploadLocation}) - this should be a valid location`)
        }

        if (config.locationTypeError) {
            console.log (`LOCATION_TYPE (${config.locationType}) - this should be a valid location type (Windows / Mac / AWS / Azure)`)
        }

        console.log (config)

        throw new Error ('[ERROR] Not all environment variables are defined')
    }
    return config
}