import { createPool, Pool, PoolOptions } from 'mysql2/promise';
import {  QueryResult } from 'mysql2';
// import { getSecretByArn } from '@/utils/aws/get-secret-by-arn';
// import { ResultSetHeader, RowDataPacket, ProcedureCallPacket, QueryResult, FieldPacket } from 'mysql2';
// import { getSecretByArn } from './get-secret-by-arn';

type DB_SECRETSTRING = {
  dbClusterIdentifier: string;
  engine: string;
  host: string;
  dbname: string;
  port: string;
  username: string;
  password: string;
};

export type SqlStatus = {
  message: string;
  code: string;
  errorno: number;
  sqlMessage: string;
  sqlState: string;
  sql: string;
};

export class DbController {
  private pool: Pool | null = null;

  constructor() {}

  connectToPool = async () => {
    const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = process.env;

    const poolOptions: Partial<PoolOptions> = {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 3, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    };

    // Check if env variable for secret
    const dbSecretArn = process.env.DATABASE_SECRET_ARN || null;

    if (dbSecretArn === null) {
      if (!DB_DATABASE || !DB_HOST || !DB_USER || !DB_PASSWORD) {
        throw new Error('Database environment variables are not set.');
      }
    } else {
      try {
        // const dbSecret = (await getSecretByArn(dbSecretArn)) as DB_SECRETSTRING;

        // poolOptions.host = dbSecret.host;
        // poolOptions.user = dbSecret.username;
        // poolOptions.password = dbSecret.password;
        // poolOptions.database = dbSecret.dbname;
        // poolOptions.port = +dbSecret.port;
        throw new Error('Database not setup for AWS. Seqarch code base for this error.');
      } catch (error) {
        console.log (`[ERROR]`, error)
      }
    }

    this.pool = await createPool(poolOptions);
    return this.pool
  };

  /**
   * Closes the database pool
   */
  disconnectDB = async () => {
    await this.pool?.end();
  };

  /**
   * Executes the required sql
   *
   * @param sql
   * @returns
   */
  async query<T extends QueryResult>(sql: string): Promise<T> {
    try {
      if (!this.pool) {
        this.connectToPool();
      }
      const [rows] = await this.pool!.query<T>(sql);

      return rows;
    } catch (error) {
      console.log(error);
      throw error
      // const { message, code, errorno, sqlMessage, sqlState, sql } = error as SqlStatus;
      // throw new SqlError(message, code, errorno, sqlMessage, sqlState, sql);
    }
  }
}
