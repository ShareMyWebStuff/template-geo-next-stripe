import 'dotenv/config'
import { readInEnvVariables } from 'config/read-in-env-variables';
import { DbController } from './utils/db';
import { migrate } from 'migrate-ddl/migrate';


const callMigrate = async () => {

    try {
        
        // Get the environment variables
        readInEnvVariables()

        // Setup the database
        const db = new DbController();
        db.connectToPool();

        await migrate (db)

    } catch (error) {
        console.log ( '[ERROR]', error )
        return false
    }

    return true
}

callMigrate()
.then ( (res) => {
    if (res) {
        console.log ( 'Success' )
    } else {
        console.log ( 'Failed' )
    }
})
