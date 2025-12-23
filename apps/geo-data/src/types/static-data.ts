import { Country } from "./country.js";

// This is the data we hold about the geo files imported
export interface StaticData {
    'COUNTRIES': { [key: string]: Country },
}
