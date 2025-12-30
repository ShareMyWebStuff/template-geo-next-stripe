import * as fs from 'fs';

const DATABASE_DIR = 'migrations/ddl/';

import { resolve } from 'path';
import { FileStructure } from 'types/file-structure';

/**
 * Gets the root directory path
 * 
 * @returns 
 */
export const getDirname = () => {
    const dirname = resolve(__dirname, '..' );

    return (dirname );
}

/**
 * Reads the database-deploy-file into an array, an element per record.
 */
export const readDatabaseDeployFile = <T>(filename: string) => {
  let fileErrors = 0;

  try {

    const deployFile = resolve(getDirname(), DATABASE_DIR, filename )
    const data = fs.readFileSync(`${deployFile}`, 'utf8');

    // Remove the /r characters
    const fileContent = data.replace(new RegExp('\r', 'g'), '');

    // Split the stream from the file into an array
    const tmpLines: string[] = !fileContent ? [] : fileContent?.split('\n');

    // Remove comments and blank lines
    const lines = tmpLines.filter((line) => !line.startsWith('--') && line.trimEnd().length > 0);

    const dataDeploys = lines.map((line, idx) => {
      const deploy = line.split('|');
      if (deploy.length !== 7) {
        console.log(`Error reading line ${idx} from file ${filename}`);
        fileErrors++;
      }

      return {
        deployId: parseInt(deploy[0]),

        deployType: deploy[1].trim(),
        deployName: deploy[2].trim(),
        deployAction: deploy[3].trim(),
        uninstall: deploy[4].trim(),
        install: deploy[5].trim(),
        rollbackAction: deploy[6].trim(),
      };
    });

    if (fileErrors > 0) {
      throw new Error(`Error in file ${filename}`);
    }

    return dataDeploys as T[];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const readInFile = ( deployType: string, deployName: string, deployAction: string, filename: string) => {
  const deployFile = resolve(getDirname(), DATABASE_DIR, deployType, deployName, deployAction, filename)

  const data = fs.readFileSync(deployFile, 'utf8');

  // Remove the /r characters
  const fileContent = data.replace(new RegExp('\r', 'g'), '');

  return fileContent;
};

export const fileExists = (deployType: string, deployName: string, deployAction: string, filename: string) => {
  const deployFile = resolve(getDirname(), DATABASE_DIR, deployType, deployName, deployAction, filename)
  return fs.existsSync(deployFile);
};
