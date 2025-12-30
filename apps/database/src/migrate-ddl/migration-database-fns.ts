import { QueryResult } from 'mysql2';
import { DatabaseDeployItem } from 'types/database-deploy-item';
import { DbController } from 'utils/db';
import { SqlError } from 'utils/error-handler';

// DROP TABLE IF EXISTS util_database_deploy;
const CREATE_DATABASE_DEPLOY_TABLE = `CREATE TABLE IF NOT EXISTS _database_deploy
(
    deployId            INT UNSIGNED          NOT NULL,
    deployType          VARCHAR(20)           NOT NULL,
    deployName          VARCHAR(50)           NOT NULL,
    deployAction        VARCHAR(50)           NOT NULL,
    uninstall           CHAR(1)               NOT NULL,
    install             CHAR(1)               NOT NULL,
    rollbackAction      VARCHAR(50)           NOT NULL,
    status              CHAR(1)               NOT NULL  DEFAULT 'U',
    created_at          TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (deployId)
) ENGINE=InnoDB;`;

export const createDeployTable = async (db: DbController) => {
  try {
    await db.query(CREATE_DATABASE_DEPLOY_TABLE);
  } catch (err: unknown) {
    console.log(`[Error] creating util_database_deploy`);
  }
};

export const readDatabaseDeploymentTable = async (db: DbController) => {
  try {
    const deployRows = await db.query<DatabaseDeployItem[]>(`SELECT * FROM _database_deploy ORDER BY deployId ASC`);

    const deployedItems = deployRows;

    return deployedItems;
  } catch (error) {
    if (error instanceof SqlError) {
      console.log('Error Caught');
      console.log(error);
      throw error;
    }
    throw 'Error selecting from table.';
  }
};

export const runQuery = async <T extends QueryResult>(db: DbController, sql: string) => {
  try {
    const dbRes = await db.query<T>(sql);
    // console.log(dbRes);
    return dbRes;
  } catch (err) {
    console.log(`[Error] running query.`);
    throw err;
  }
};
