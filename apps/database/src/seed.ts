import 'dotenv/config'
import { readInEnvVariables } from 'config/read-in-env-variables';
import { DbController } from './utils/db';
import { seedDb } from 'seed-data/seed-db';



const callSeedDb = async () => {

    try {
        
        // Get the environment variables
        const config = readInEnvVariables()

        // Setup the database
        const db = new DbController();
        db.connectToPool();

        // Create the drop table scripts
        await seedDb ( db, config )

    } catch (error) {
        console.log ( '[ERROR]', error )
        return false
    }

    return true
}

callSeedDb()
.then ( (res) => {
    if (res) {
        console.log ( 'Success' )
    } else {
        console.log ( 'Failed' )
    }
})
