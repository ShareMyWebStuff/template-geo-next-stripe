import { DatabaseDeployItem } from "types/database-deploy-item";
import { FileStructure } from "types/file-structure";
import { runQuery } from "./migration-database-fns";
import { DbController } from "utils/db";
import { ResultSetHeader } from "mysql2";
import { readInFile } from "./read-database-deploy-file";

export const deployChangesToDatabase = async ( db: DbController, deployFiles: FileStructure[], deployTable: DatabaseDeployItem[] ) => {

    for (const file of deployFiles) {
      // Have we got a deployment record for the deployId
      const prevDeployed = deployTable.find((item) => item.deployId === file.deployId);

      if (!prevDeployed || prevDeployed.status !== 'P') {

        await runQuery(
          db,
          !prevDeployed
            ? `INSERT INTO _database_deploy ( deployId, deployType, deployName, deployAction, uninstall, install, rollbackAction, status ) VALUES (${file.deployId}, '${file.deployType}', '${file.deployName}', '${file.deployName}', '${file.uninstall}', '${file.install}', '${file.rollbackAction}', 'U' );`
            : `UPDATE _database_deploy SET status = 'U' WHERE deployId = ${file.deployId};`,
        );

        if ( file.install === 'Y') {
            const sql = readInFile(file.deployType, file.deployName, file.deployAction, 'install.sql');

            const ret = await runQuery<ResultSetHeader>(db, sql);

            console.log(`${('     ' + file.deployId.toString()).substr(-6)} - Loaded (${file.deployType}/${file.deployName}/${file.deployAction}/install.sql)`);

            await runQuery(db, `UPDATE _database_deploy SET status = 'P' WHERE deployId = ${file.deployId};`);
        }

        // cnt++;
        // if (cnt > 24) process.exit(0);

        //   process.exit(0);
      } else {
        console.log(`${('     ' + file.deployId.toString()).substr(-6)} - Already loaded (${file.deployType}/${file.deployName}/${file.deployAction}/install.sql)`);
      }
    }



}
