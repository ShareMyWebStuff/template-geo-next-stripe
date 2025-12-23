import { resolve } from 'path';

/**
 * Gets the root directory path
 * 
 * @returns 
 */
export const getDirname = () => {
    const dirname = resolve(__dirname, '..' );

    return (dirname );
}
