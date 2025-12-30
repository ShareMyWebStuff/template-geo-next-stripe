import { existsSync } from 'fs';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { EnvConfig } from "config/read-in-env-variables";
import { DbController } from "utils/db";


export const seedGeoData = async (db: DbController, config: EnvConfig ) => {

    // Get the command file
    const cmdFile = resolve(config.databaseUploadLocation, 'commands.txt' )

    if (!existsSync(cmdFile)) {
        // throw new Error(`[ERROR] File does not exist (${cmdFile})`)
        console.log (`[ERROR] File does not exist (${cmdFile})`)
    }

    // Read the commands in from the command file
    const data = await readFile(cmdFile, 'utf8');
    const lines = data.split(/\r?\n/);

    // Execute the commands from the command file
    for ( const sql of lines ) {
        if ( sql.trim() !== '' && sql.includes(';')) {
            console.log (`Running (${sql})`)
            await db.query(sql)
        }
    }

    // Truncate and repopulate the countries
    await db.query(`TRUNCATE TABLE geo_countries;`)
    await db.query(`INSERT INTO geo_countries SELECT * FROM import_countries;`)

    // Populate the import_city_difference with all imported cities that we need to check if we have anyone linked to this
    await db.query(`INSERT INTO import_city_differences ( city_id, status, moved )
        SELECT  gc.city_id, 'U' AS status, CASE WHEN gc.latitude != ic.latitude OR gc.longitude != ic.longitude THEN 'Y' ELSE 'N' END AS moved
        FROM	geo_cities gc
                INNER JOIN import_cities ic ON gc.city_id = ic.geoname_id
        WHERE	gc.city_name    != ic.search_name
        OR      gc.country_code != ic.country_code
        OR      gc.latitude     != ic.latitude
        OR      gc.longitude    != ic.longitude;
        `)
    
    // Insert all new cities we have found
    await db.query (`INSERT INTO geo_cities ( city_id, city_name, country_code, latitude, longitude, geo_location )
    SELECT  ic.geoname_id, ic.search_name, ic.country_code, ic.latitude, ic.longitude, ST_SRID(POINT(ic.longitude, ic.latitude), 4326) AS geo_location
    FROM	import_cities ic
            LEFT OUTER JOIN geo_cities gc ON gc.city_id = ic.geoname_id
    WHERE   gc.city_id IS NULL;
    `)

    // Populate the import_city_difference with existing cities that do not exist any more
    await db.query (`INSERT INTO import_city_differences ( city_id, status, moved )
    SELECT  gc.city_id, 'D' AS status, 'N' AS moved
    FROM	geo_cities gc
            LEFT OUTER JOIN import_cities ic ON gc.city_id = ic.geoname_id
    WHERE   ic.search_name IS NULL;
    `)

    // Update the geo_cities whose details have change
    await db.query (`UPDATE  geo_cities gc
    INNER JOIN import_cities ic ON gc.city_id = ic.geoname_id
    INNER JOIN import_city_differences icd ON gc.city_id = icd.city_id
                                            AND icd.status = 'U'
    SET   	gc.city_name    = ic.search_name,
            gc.country_code = ic.country_code,
            gc.latitude     = ic.latitude,
            gc.longitude    = ic.longitude;
    `)

    // Delete geo_cities that are to be deleted
    await db.query (`DELETE
    FROM    gc
    USING 	geo_cities gc
            INNER JOIN import_cities ic ON gc.city_id = ic.geoname_id
            INNER JOIN import_city_differences icd 	ON 	gc.city_id = icd.city_id
                                                    AND	icd.status = 'D';
    `)

    // Truncate the tables first
    await db.query (`TRUNCATE TABLE geo_locations`)

    // Populate the geo_locations table with cities
    await db.query (`INSERT INTO geo_locations ( location, country_code, city_postcode, city_id, latitude, longitude, north_lat, south_lat, east_long, west_long )
    SELECT	search_name, country_code, 'C', geoname_id, latitude, longitude, north_lat, south_lat, east_long, west_long
    FROM	import_cities;
    `)

    // Populate the geo_locations table with partial postcodes
    await db.query(`INSERT INTO geo_locations ( location, country_code, city_postcode, city_id, latitude, longitude, north_lat, south_lat, east_long, west_long )
    SELECT  CONCAT (postcode, CASE WHEN search_name = '' THEN '' ELSE CONCAT(' ( ', search_name, ' )') END) AS location, 
            country_code, 'S', NULL, latitude, longitude, north_lat, south_lat, east_long, west_long
    FROM	import_partials;`);

    // Populate the geo_locations table with postcodes
    await db.query(`INSERT INTO geo_locations ( location, country_code, city_postcode, city_id, latitude, longitude, north_lat, south_lat, east_long, west_long )
    SELECT  CONCAT (postcode, CASE WHEN search_name = '' THEN '' ELSE CONCAT(' ( ', search_name, ' )') END) AS location, 
            country_code, 'S', NULL, latitude, longitude, north_lat, south_lat, east_long, west_long
    FROM	import_postcodes;`);


}