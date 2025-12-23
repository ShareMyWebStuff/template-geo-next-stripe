import axios from 'axios'
import { createWriteStream  } from 'fs';

export const ftpFile = async (url: string, outputPath: string) => {

    try {

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    const stream = await response.data as NodeJS.ReadableStream;

    const writer = createWriteStream(outputPath);

    stream.pipe(writer);

    return new Promise<void>((resolve, reject) => {
        writer.on('finish', () => {
            writer.end();
            resolve(); 
        })
    
        writer.on('error', (err) => {
            console.log ('error ++++')
            console.log (err)
            writer.end();
            reject(); 
        })
    })

        
    } catch (error) {
        console.log (error)
    }
}
