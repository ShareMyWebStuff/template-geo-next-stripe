import { createWriteStream } from "fs";
import { CityLocations } from "../types/city.js";
import { boundingBox15Miles } from "./bounding-box.js";

export const exportCityFile = async ( filename: string, cities: CityLocations[], recreateFile: boolean = true) => {

    return new Promise<void> ( ( resolve, reject) => {

        const writeStream = createWriteStream(filename, {
            flags: (recreateFile? 'w' : 'a'), // 'w' = write, 'a' = append
            encoding: 'utf8',
        });

        writeStream.on('error', (err) => {
            console.error(`Error writing to file (${filename}):`, err);
            reject()
        });

        // Optional: handle finish event
        writeStream.on('finish', () => {
            // console.log(`Finished writing to file (${filename}).`);
            resolve ()
        });

        for ( const city of cities ) {
            if ( city.status !== 'D') {
                const {geonameId, name, searchName, countryCode, adminCode1, adminCode2, adminCode3, adminCode4, latitude, longitude, modificationDate} = city
                const border = boundingBox15Miles (Number(latitude), Number(longitude))
                writeStream.write ( `${geonameId}\t${name}\t${searchName}\t${countryCode}\t${adminCode1}\t${adminCode2}\t${adminCode3}\t${adminCode4}\t${latitude}\t${longitude}\t${border.northLat}\t${border.southLat}\t${border.eastLon}\t${border.westLon}\t${modificationDate.getTime()}\n` )
            }
        }

        // Close the stream
        writeStream.end();

    })

}