
export type Admin1 = {
    geonameId: number;
    region: string;
    adminCode1: string;
}

export type Admin2 = {
    geonameId: number;
    region: string;
    adminCode1: string;
    adminCode2: string;
    adminPtr1?: Admin1;
}

export type Admin3 = {
    geonameId: number;
    region: string;
    adminCode1: string;
    adminCode2: string;
    adminCode3: string;
    adminPtr1?: Admin1;
    adminPtr2?: Admin2;
}

export type Admin4 = {
    geonameId: number;
    region: string;
    adminCode1: string;
    adminCode2: string;
    adminCode3: string;
    adminCode4: string;
    adminPtr1?: Admin1;
    adminPtr2?: Admin2;
    adminPtr3?: Admin3;
}
