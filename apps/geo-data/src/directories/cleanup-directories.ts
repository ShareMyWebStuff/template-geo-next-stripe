import { resolve } from "path"
import { createDirectory } from "./create-directory.js"
import { removeDirectory } from "./remove-directory.js"
import { getDirname } from "./get-dirname.js"


/**
 * Deletes and recreates the working and latest directory sp we can 
 */
export const cleanUpDirectories = async () => {

    const dirname = getDirname()
    console.log (`dirname : ${__dirname}`)

    // Remove the working and latest data directories
    await removeDirectory(resolve(dirname, 'data', 'working'))
    await removeDirectory(resolve(dirname, 'data', 'latest'))

    // Recreate the working and latest directories
    await createDirectory(resolve(dirname, 'data', 'working'))
    await createDirectory(resolve(dirname, 'data', 'working', 'city', 'zipped' ))
    await createDirectory(resolve(dirname, 'data', 'working', 'city', 'unzipped' ))
    await createDirectory(resolve(dirname, 'data', 'working', 'postcode', 'zipped' ))
    await createDirectory(resolve(dirname, 'data', 'working', 'postcode', 'unzipped' ))
    await createDirectory(resolve(dirname, 'data', 'working', 'partial', 'zipped' ))
    await createDirectory(resolve(dirname, 'data', 'working', 'partial', 'unzipped' ))
    await createDirectory(resolve(dirname, 'data', 'working', 'static', 'zipped' ))
    await createDirectory(resolve(dirname, 'data', 'working', 'static', 'unzipped' ))
    await createDirectory(resolve(dirname, 'data', 'latest'))

    console.log ('> Recreated directory structure')

}
