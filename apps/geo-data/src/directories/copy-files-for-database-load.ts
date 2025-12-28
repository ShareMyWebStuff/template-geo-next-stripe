import { EnvConfig } from "config/read-in-env-variables"
import { resolve, join } from "path";
import { existsSync, mkdirSync, rmSync } from 'fs';
import { readdir, copyFile } from "fs/promises";
import { getDirname } from "./get-dirname"

const copyFilesOnWindows = async (dataDir: string, databaseUploadLocation: string)  => {

    // Delete all files already in destination directory
    if (existsSync(databaseUploadLocation)) {
        rmSync (databaseUploadLocation, { recursive: true, force: true })
        mkdirSync(databaseUploadLocation, { recursive: true });
    }
    

    // Read in files in data directory
    const dataFiles = await readdir(dataDir, { withFileTypes: true });

    for (const entry of dataFiles) {
        const srcPath = join(dataDir, entry.name);
        const destPath = join(databaseUploadLocation, entry.name);

        // Copy file
        await copyFile(srcPath, destPath);
    }

}

const copyFilesOnAws = async (dataDir: string, databaseUploadLocation: string)  => {
    console.log ('[ERROR] copyFilesOnAws to be created')
    throw new Error (`[ERROR] copyFilesOnAws to be created'`)
}

const copyFilesOnAzure = async (dataDir: string, databaseUploadLocation: string)  => {
    console.log ('[ERROR] copyFilesOnAzure to be created')
    throw new Error (`[ERROR] copyFilesOnAzure to be created`)
}

export const copyFilesForDatabaseLoad = async ( config: EnvConfig) => {

    const start = Date.now();

    const __dirname = getDirname()
    const dataDir = resolve(__dirname, 'data', 'latest' )

    if ( config.locationType === 'WINDOWS') {
        copyFilesOnWindows (dataDir, config.databaseUploadLocation);
    } else if ( config.locationType === 'AWS') {
        copyFilesOnAws (dataDir, config.databaseUploadLocation);
    } else if ( config.locationType === 'AZURE') {
        copyFilesOnAzure (dataDir, config.databaseUploadLocation);
    } else {
        throw new Error (`[ERROR] copyFilesForDatabaseLoad called with invalid locationType`)
    }

    const timeTaken = Date.now() - start;
    console.log (`Copy files for database load (${timeTaken} ms)`)

}