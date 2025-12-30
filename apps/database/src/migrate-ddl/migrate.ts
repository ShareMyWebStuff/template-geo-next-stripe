import { FileStructure } from "types/file-structure";
import { DbController } from "utils/db";
import { readDatabaseDeployFile } from "./read-database-deploy-file";
import { createDeployTable, readDatabaseDeploymentTable } from "./migration-database-fns";
import { deployChangesToDatabase } from "./deploy-changes-to-database";


export const migrate = async ( db: DbController) => {

    // Read in the migration file
    const deployFile = readDatabaseDeployFile<FileStructure>('database-deploy.txt');

    // Create the database depploy table
    await createDeployTable(db);

    // Read the database deploy table from thre database
    const deployTable = await readDatabaseDeploymentTable(db);

    // Deploy the changes to the database
    await deployChangesToDatabase (db, deployFile, deployTable )

}
