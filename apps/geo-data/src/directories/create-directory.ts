import { mkdir } from 'fs/promises';

/**
 * Creates the directory
 * 
 * @param dirPath 
 */
export const createDirectory = async ( dirPath: string ) => {
    try {
        await mkdir (dirPath, {recursive: true})
    } catch (error) {
        console.error (error)
    }
}
