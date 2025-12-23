import { writeFile } from "fs/promises";
import { COUNTRY_FILES, REGION_FILES } from "../config/config.js";
import { getDirname } from "../directories/get-dirname.js";
import { resolve } from "path";

const EXPORT_DIRECTORY='D://geonames_datafile//'

export const exportCommandFile = async ( ) => {

    const __dirname = getDirname()
    const filename = resolve(__dirname, 'data', 'latest', 'commands.txt' )

    let sql = `-- Static files\n`
    sql += `LOAD DATA INFILE '${EXPORT_DIRECTORY}countries.txt'    INTO TABLE imp_countries    FIELDS TERMINATED BY '\\t' LINES TERMINATED BY '\\n';\n`
    sql += '\n'

    // Clear the import tables for the next load
    sql += `TRUNCATE TABLE import_cities; \n`
    sql += `TRUNCATE TABLE import_partials; \n`
    sql += `TRUNCATE TABLE import_postcodes; \n`


    // Read each value held in the country object, lists the countries we want read in
    for ( const ctryCode of COUNTRY_FILES){

        sql += `-- Load files for country code (${ctryCode})\n`;
        const city = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'cities')})
        if ( city ) {
            sql += `LOAD DATA INFILE '${EXPORT_DIRECTORY}cities-${ctryCode}.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\\t' LINES TERMINATED BY '\\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);\n`
        }

        // Read in the partial file
        const postcode = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'postcodes')})
        if ( postcode ) {
            sql += `LOAD DATA INFILE '${EXPORT_DIRECTORY}postcodes-${ctryCode}.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\\t' LINES TERMINATED BY '\\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );\n`
        }

        // Read in the partial file
        const partials = REGION_FILES[ctryCode]!.find( (file) => { return (file.type === 'partials')})
        if ( partials ) {
            sql += `LOAD DATA INFILE '${EXPORT_DIRECTORY}partials-${ctryCode}.txt'  INTO TABLE import_partials  FIELDS TERMINATED BY '\\t' LINES TERMINATED BY '\\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );\n`
        }

        sql += '\n'
    }

    await writeFile(filename, sql );
}
