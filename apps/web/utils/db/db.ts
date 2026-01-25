import { DbController } from "./db-controller";

declare global {
    // eslint-disable-next-line no-var
    var db: DbController | undefined;
}

export const db = globalThis.db || new DbController();
console.log ('EH UP')
console.log ('EH UP')
console.log ('EH UP')
console.log ('EH UP')
console.log ('EH UP')
console.log ('EH UP')
console.log ('EH UP')
db.connectToPool()

if (process.env.NODE_ENV !== "production") globalThis.db = db;
