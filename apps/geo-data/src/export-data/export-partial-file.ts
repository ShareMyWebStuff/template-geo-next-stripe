import { createWriteStream } from "fs";
import { boundingBox15Miles } from "./bounding-box.js";
import { Partials } from "../types/partials.js";

export const exportPartialFile = async ( filename: string, partials: Partials[], recreateFile: boolean = true) => {

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
            resolve()
        });

        for (const idx in partials){
            if ( partials[idx].status !== 'D') {
                const {postcode, placeName, searchName, countryCode, latitude, longitude, geonameId } = partials[idx]!
                const border = boundingBox15Miles (Number(latitude), Number(longitude))
                
                writeStream.write ( `${postcode}\t${placeName}\t${searchName}\t${countryCode}\t${geonameId}\t${latitude}\t${longitude}\t${border.northLat}\t${border.southLat}\t${border.eastLon}\t${border.westLon}\n` )
            }
        }

        // Close the stream
        writeStream.end();

    })

}