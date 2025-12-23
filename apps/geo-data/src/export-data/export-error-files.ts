import { resolve } from "path";
import { getDirname } from "../directories/get-dirname.js";
import { createWriteStream } from "fs";

export const exportErrorFile = async ( ctryCode: string, errors: string[], recreateFile: boolean = true) => {

    const start = Date.now();
    const __dirname = getDirname()
    const filename = resolve(__dirname, 'data', 'latest', `errors-${ctryCode}.txt` )


    return new Promise<void> ( ( resolve, reject) => {

        const writeStream = createWriteStream(filename, {
        flags: (recreateFile? 'w' : 'a'), // 'w' = write, 'a' = append
            encoding: 'utf8',
        });

        writeStream.on('error', (err) => {
            console.error(`  > Error writing to file (${filename}):`, err);
            reject()
        });

        // Optional: handle finish event
        writeStream.on('finish', () => {
            const timeTaken = Date.now() - start;
            console.log (`  > Export errors ${ctryCode} took (${timeTaken} ms)`)
            resolve()
        });

        for (const idx in errors){
            writeStream.write ( `${errors[idx]}\n` )
        }    

        // Close the stream
        writeStream.end();

    })

}
