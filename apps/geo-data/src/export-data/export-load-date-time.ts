import { writeFile } from "fs/promises";
import { resolve } from "path";
import { getDirname } from "../directories/get-dirname.js";

/**
 * 
 * @returns 
 */
const getDataTime = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    now.getUTCFullYear() + '-' +
    pad(now.getUTCMonth() + 1) + '-' +
    pad(now.getUTCDate()) + ' ' +
    pad(now.getUTCHours()) + ':' +
    pad(now.getUTCMinutes()) + ':' +
    pad(now.getUTCSeconds())
  );
}

/**
 * Loops through all the static files and exports each one
 * 
 * @param geoImport 
 */
export const exportLoadDateTime = async ( ) => {

    const start = Date.now();

    const __dirname = getDirname()
    const filename = resolve(__dirname, 'data', 'latest', 'load-date.txt' )

    await writeFile(filename, getDataTime() + '\n');

    const timeTaken = Date.now() - start;

    console.log (`Export load date files (${timeTaken} ms)`)
}
