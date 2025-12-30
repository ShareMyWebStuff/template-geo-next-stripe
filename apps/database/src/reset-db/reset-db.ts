import { RowDataPacket } from "mysql2";
import { DbController } from "utils/db";

interface Views extends RowDataPacket { TABLE_NAME: string }
interface Tables extends RowDataPacket { TABLE_NAME: string }
interface Procedures extends RowDataPacket { ROUTINE_NAME: string }
interface Functions extends RowDataPacket { ROUTINE_NAME: string }


/**
 * Create the drop statements for all views that exist in the database
 * @param db 
 * @returns 
 */
export const getViewsToDrop = async ( db: DbController ) => {
    const views = await db.query<Views[]> ( 'SELECT table_name FROM information_schema.views WHERE table_schema = DATABASE();')

    return (views.map ( item => `DROP VIEW IF EXISTS ${item.TABLE_NAME};`))
}

/**
 * Create the drop statements for all tables that exist in the database
 * @param db 
 * @returns 
 */
export const getTablesToDrop = async ( db: DbController ) => {
    const tables = await db.query<Tables[]> ( 'SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE();')

    return (tables.map ( item => `DROP TABLE IF EXISTS ${item.TABLE_NAME};`))
}

/**
 * Create the drop statements for all procedures that exist in the database
 * @param db 
 * @returns 
 */
export const getProceduresToDrop = async ( db: DbController ) => {
    const procedures = await db.query<Procedures[]> ( `SELECT routine_name FROM information_schema.routines WHERE routine_schema = DATABASE() AND routine_type = 'PROCEDURE';`)

    return (procedures.map ( item => `DROP PROCEDURE IF EXISTS ${item.ROUTINE_NAME};`))
}

/**
 * Create the drop statements for all functions that exist in the database
 * @param db 
 * @returns 
 */
export const getFunctionsToDrop = async ( db: DbController ) => {
    const fns = await db.query<Functions[]> ( `SELECT routine_name FROM information_schema.routines WHERE routine_schema = DATABASE() AND routine_type = 'FUNCTION';`)

    return (fns.map ( item => `DROP FUNCTION IF EXISTS ${item.ROUTINE_NAME};`))
}

/**
 * This deletes all the items out of the database
 * - Functions
 * - Procedures
 * - Tables
 * - Views
 * 
 * @param db 
 */
export const resetDb = async ( db: DbController ) => {

    const views = await getViewsToDrop ( db );
    const tables = await getTablesToDrop ( db );
    const procedures = await getProceduresToDrop ( db );
    const functions = await getFunctionsToDrop ( db );

    const cmds = [...functions, ...procedures, ...views, ...tables]

    try {
        db.query ('SET FOREIGN_KEY_CHECKS = 0;')
        
        for ( const sql of cmds ) {
            await db.query ( sql );
        }

    } catch (error) {
        console.log (error)
    } finally {
        db.query ('SET FOREIGN_KEY_CHECKS = 1;')
    }

}


