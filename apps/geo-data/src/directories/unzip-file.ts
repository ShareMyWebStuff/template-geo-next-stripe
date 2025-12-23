import * as unzipper from "unzipper";

export const unZipFile = async (zipFilePath: string, outputDir: string): Promise<void> => {

    const directory = await unzipper.Open.file(zipFilePath);
    await directory.extract({ path: outputDir })

}
