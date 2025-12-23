import { rm } from 'fs/promises';

/**
 * Removes the directory and all its content
 * 
 * @param dirPath 
 */
export const removeDirectory = async ( dirPath: string ) => {
    try {
        await rm (dirPath, {recursive: true, force: true})
    } catch (error) {
        console.error (error)
    }
}
