/* eslint-disable turbo/no-undeclared-env-vars */
import { createPool, Pool, PoolOptions } from 'mysql2/promise';
import { QueryResult } from 'mysql2';
import { SqlError } from './error-handler';

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
    try {
      const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = process.env;

      const poolOptions: Partial<PoolOptions> = {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        // maxIdle: 3, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        // queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      };

      // console.log(poolOptions);
      this.pool = createPool(poolOptions);
    } catch (err) {
      console.log('ERROR', err);
    }

  };

  disconnectDB = async () => {
    await this.pool?.end();
  };

  // async query<T extends QueryResult>(sql: string): Promise<T> {
  async query<T extends QueryResult>(sql: string) {
    try {
      if (!this.pool) {
        console.log('Query ===> POOL NOT SET');
        this.connectToPool();
      }
      // console.log('Query ===>', sql);
      // const ret = await this.pool!.query(sql);
      const [rows] = await this.pool!.query<T>(sql);
      // console.log('Query Run ===>');

      return rows;
    } catch (error) {
      console.log('Query Error');
      console.log(error);
      const { message, code, errorno, sqlMessage, sqlState, sql } = error as SqlStatus;
      throw new SqlError(message, code, errorno, sqlMessage, sqlState, sql);
    }
  }

}
