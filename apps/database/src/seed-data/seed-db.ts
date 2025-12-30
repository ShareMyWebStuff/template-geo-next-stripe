import { EnvConfig } from "config/read-in-env-variables";
import { DbController } from "utils/db";
import { seedGeoData } from "./seed-geo-data";


export const seedDb = async ( db: DbController, config: EnvConfig) => {

    console.log (`Loading the geo seed data`)
    await seedGeoData (db, config )


}
