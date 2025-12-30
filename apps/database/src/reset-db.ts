import 'dotenv/config'
import { readInEnvVariables } from 'config/read-in-env-variables';
import { DbController } from './utils/db';
import { resetDb } from 'reset-db/reset-db';
import { migrate } from 'migrate-ddl/migrate';


const callResetDb = async () => {

    try {
        
        // Get the environment variables
        readInEnvVariables()

        // Setup the database
        const db = new DbController();
        db.connectToPool();

        // Create the drop table scripts
        await resetDb ( db )

        // Applies the database migrations
        await migrate ( db )


    } catch (error) {
        console.log ( '[ERROR]', error )
        return false
    }

    return true
}

callResetDb()
.then ( (res) => {
    if (res) {
        console.log ( 'Success' )
    } else {
        console.log ( 'Failed' )
    }
})
