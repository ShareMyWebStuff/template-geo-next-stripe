/**
 * Error thrown for sql errors
 */
export class SqlError extends Error {
  constructor(
    public message: string,
    public code: string,
    public errorNo: number,
    public sqlMessage: string,
    public sqlState: string,
    public sql: string,
  ) {
    super(sqlMessage);
  }
}

/**
 * Error thrown for errors returned to api
 */
export class ApiResponseError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public body: string,
  ) {
    super(message);
  }
}
