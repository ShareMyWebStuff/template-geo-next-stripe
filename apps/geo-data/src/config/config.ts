// RERUN - This specifies if we have run for this data 
// const RERUN = false

const STATIC_SERVER_URL = 'http://download.geonames.org/export/dump/';
const CITIES_SERVER_URL = 'http://download.geonames.org/export/dump/';
const POSTCODES_SERVER_URL = 'https://download.geonames.org/export/zip/';

type STATIC_FILE = {
    remoteFilename: string;
    extractName: string | undefined;
    zipped: boolean;
    url: string;
    countryCode?: string
    subName?: string;
}

export const STATIC_GEO_DATA: {[key: string]: STATIC_FILE} = {
    'ADMIN1'          : { remoteFilename: 'admin1CodesASCII.txt',            extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL },
    'ADMIN2'          : { remoteFilename: 'admin2Codes.txt',                 extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL },
    'ADMIN5'          : { remoteFilename: 'adminCode5.zip',                  extractName: 'adminCode5.txt',       zipped: true,   url: STATIC_SERVER_URL },

    'COUNTRIES'       : { remoteFilename: 'countryInfo.txt',                 extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL },

    'DELETES'         : { remoteFilename: 'deletes-YYYY-MM-DD.txt',          extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL },

    'FEATURE_CODE_BG' : { remoteFilename: 'featureCodes_bg.txt',             extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL, countryCode: 'BG',    subName: 'featureCodes_bg',  },
    'FEATURE_CODE_EN' : { remoteFilename: 'featureCodes_en.txt',             extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL, countryCode: 'EN',    subName: 'featureCodes_en',  },
    'FEATURE_CODE_NB' : { remoteFilename: 'featureCodes_nb.txt',             extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL, countryCode: 'NB',    subName: 'featureCodes_nb',  },
    'FEATURE_CODE_NN' : { remoteFilename: 'featureCodes_nn.txt',             extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL, countryCode: 'NN',    subName: 'featureCodes_nn',  },
    'FEATURE_CODE_NO' : { remoteFilename: 'featureCodes_no.txt',             extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL, countryCode: 'NO',    subName: 'featureCodes_no',  },
    'FEATURE_CODE_RU' : { remoteFilename: 'featureCodes_ru.txt',             extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL, countryCode: 'RU',    subName: 'featureCodes_ru',  },
    'FEATURE_CODE_SV' : { remoteFilename: 'featureCodes_sv.txt',             extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL, countryCode: 'SV',    subName: 'featureCodes_sv',  },

    'HIERARCHY'       : { remoteFilename: 'hierarchy.zip',                   extractName: 'hierarchy.txt',        zipped: true,   url: STATIC_SERVER_URL },

    'ISO_LANGUAGES'   : { remoteFilename: 'iso-languagecodes.txt',           extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL },

    'MODIFICATIONS'   : { remoteFilename: 'modifications-YYYY-MM-DD.txt',    extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL },

    'NO_COUNTRY'      : { remoteFilename: 'no-country.zip',                  extractName: 'no-country.txt',       zipped: true,   url: STATIC_SERVER_URL },
    'SHAPES'          : { remoteFilename: 'shapes_all_low.zip',              extractName: 'shapes_all_low.txt',   zipped: true,   url: STATIC_SERVER_URL },
    'TIME_ZONES'      : { remoteFilename: 'timeZones.txt',                   extractName: undefined,              zipped: false,  url: STATIC_SERVER_URL },
    'USER_TAGS'       : { remoteFilename: 'userTags.zip',                    extractName: undefined,              zipped: true,   url: STATIC_SERVER_URL },
}

export type REGION_FILE = {
    remoteFilename: string;
    extractName: string;
    zipped: boolean;
    url: string;
    type: string
    // countryCode?: string
    // subName?: string;
}

export const REGION_FILES: {[key: string]: REGION_FILE[]} = {
    'AD'              : [{ remoteFilename: 'AD.zip',                          extractName: 'AD.txt',               zipped: true,   type: 'cities',        url: STATIC_SERVER_URL,     },
                         { remoteFilename: 'AD.zip',                          extractName: 'AD.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'AE'              : [{ remoteFilename: 'AE.zip',                          extractName: 'AE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AF'              : [{ remoteFilename: 'AF.zip',                          extractName: 'AF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AG'              : [{ remoteFilename: 'AG.zip',                          extractName: 'AG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AI'              : [{ remoteFilename: 'AI.zip',                          extractName: 'AI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AL'              : [{ remoteFilename: 'AL.zip',                          extractName: 'AL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AM'              : [{ remoteFilename: 'AM.zip',                          extractName: 'AM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AN'              : [{ remoteFilename: 'AN.zip',                          extractName: 'AN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AO'              : [{ remoteFilename: 'AO.zip',                          extractName: 'AO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AQ'              : [{ remoteFilename: 'AQ.zip',                          extractName: 'AQ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AR'              : [{ remoteFilename: 'AR.zip',                          extractName: 'AR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'AR.zip',                          extractName: 'AR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'AS'              : [{ remoteFilename: 'AS.zip',                          extractName: 'AS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'AS.zip',                          extractName: 'AS.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'AT'              : [{ remoteFilename: 'AT.zip',                          extractName: 'AT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'AT.zip',                          extractName: 'AT.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'AU'              : [{ remoteFilename: 'AU.zip',                          extractName: 'AU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'AU.zip',                          extractName: 'AU.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'AW'              : [{ remoteFilename: 'AW.zip',                          extractName: 'AW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'AX'              : [{ remoteFilename: 'AX.zip',                          extractName: 'AX.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'AX.zip',                          extractName: 'AX.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'AZ'              : [{ remoteFilename: 'AZ.zip',                          extractName: 'AZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'AZ.zip',                          extractName: 'AZ.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'BA'              : [{ remoteFilename: 'BA.zip',                          extractName: 'BA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BB'              : [{ remoteFilename: 'BB.zip',                          extractName: 'BB.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BD'              : [{ remoteFilename: 'BD.zip',                          extractName: 'BD.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'BD.zip',                          extractName: 'BD.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'BE'              : [{ remoteFilename: 'BE.zip',                          extractName: 'BE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'BE.zip',                          extractName: 'BE.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'BF'              : [{ remoteFilename: 'BF.zip',                          extractName: 'BF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BG'              : [{ remoteFilename: 'BG.zip',                          extractName: 'BG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'BG.zip',                          extractName: 'BG.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'BH'              : [{ remoteFilename: 'BH.zip',                          extractName: 'BH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BI'              : [{ remoteFilename: 'BI.zip',                          extractName: 'BI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BJ'              : [{ remoteFilename: 'BJ.zip',                          extractName: 'BJ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BL'              : [{ remoteFilename: 'BL.zip',                          extractName: 'BL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BM'              : [{ remoteFilename: 'BM.zip',                          extractName: 'BM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'BM.zip',                          extractName: 'BM.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'BN'              : [{ remoteFilename: 'BN.zip',                          extractName: 'BN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BO'              : [{ remoteFilename: 'BO.zip',                          extractName: 'BO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BQ'              : [{ remoteFilename: 'BQ.zip',                          extractName: 'BQ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BR'              : [{ remoteFilename: 'BR.zip',                          extractName: 'BR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'BR.zip',                          extractName: 'BR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'BS'              : [{ remoteFilename: 'BS.zip',                          extractName: 'BS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BT'              : [{ remoteFilename: 'BT.zip',                          extractName: 'BT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BV'              : [{ remoteFilename: 'BV.zip',                          extractName: 'BV.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BW'              : [{ remoteFilename: 'BW.zip',                          extractName: 'BW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'BY'              : [{ remoteFilename: 'BY.zip',                          extractName: 'BY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'BY.zip',                          extractName: 'BY.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'BZ'              : [{ remoteFilename: 'BZ.zip',                          extractName: 'BZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'CA'              : [{ remoteFilename: 'CA.zip',                          extractName: 'CA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'CA.zip',                          extractName: 'CA.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'CC'              : [{ remoteFilename: 'CC.zip',                          extractName: 'CC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CD'              : [{ remoteFilename: 'CD.zip',                          extractName: 'CD.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CF'              : [{ remoteFilename: 'CF.zip',                          extractName: 'CF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CG'              : [{ remoteFilename: 'CG.zip',                          extractName: 'CG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CH'              : [{ remoteFilename: 'CH.zip',                          extractName: 'CH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'CH.zip',                          extractName: 'CH.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'CI'              : [{ remoteFilename: 'CI.zip',                          extractName: 'CI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CK'              : [{ remoteFilename: 'CK.zip',                          extractName: 'CK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CL'              : [{ remoteFilename: 'CL.zip',                          extractName: 'CL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'CL.zip',                          extractName: 'CL.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'CM'              : [{ remoteFilename: 'CM.zip',                          extractName: 'CM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CN'              : [{ remoteFilename: 'CN.zip',                          extractName: 'CN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CO'              : [{ remoteFilename: 'CO.zip',                          extractName: 'CO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'CO.zip',                          extractName: 'CO.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'CR'              : [{ remoteFilename: 'CR.zip',                          extractName: 'CR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'CR.zip',                          extractName: 'CR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'CS'              : [{ remoteFilename: 'CS.zip',                          extractName: 'CS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CU'              : [{ remoteFilename: 'CU.zip',                          extractName: 'CU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CV'              : [{ remoteFilename: 'CV.zip',                          extractName: 'CV.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CW'              : [{ remoteFilename: 'CW.zip',                          extractName: 'CW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CX'              : [{ remoteFilename: 'CX.zip',                          extractName: 'CX.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CY'              : [{ remoteFilename: 'CY.zip',                          extractName: 'CY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'CZ'              : [{ remoteFilename: 'CZ.zip',                          extractName: 'CZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'CZ.zip',                          extractName: 'CZ.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'DE'              : [{ remoteFilename: 'DE.zip',                          extractName: 'DE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'DE.zip',                          extractName: 'DE.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'DJ'              : [{ remoteFilename: 'DJ.zip',                          extractName: 'DJ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'DK'              : [{ remoteFilename: 'DK.zip',                          extractName: 'DK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'DK.zip',                          extractName: 'DK.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'DM'              : [{ remoteFilename: 'DM.zip',                          extractName: 'DM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'DO'              : [{ remoteFilename: 'DO.zip',                          extractName: 'DO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'DO.zip',                          extractName: 'DO.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'DZ'              : [{ remoteFilename: 'DZ.zip',                          extractName: 'DZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'DZ.zip',                          extractName: 'DZ.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'EC'              : [{ remoteFilename: 'EC.zip',                          extractName: 'EC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'EE'              : [{ remoteFilename: 'EE.zip',                          extractName: 'EE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'EE.zip',                          extractName: 'EE.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'EG'              : [{ remoteFilename: 'EG.zip',                          extractName: 'EG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'EH'              : [{ remoteFilename: 'EH.zip',                          extractName: 'EH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'ER'              : [{ remoteFilename: 'ER.zip',                          extractName: 'ER.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'ES'              : [{ remoteFilename: 'ES.zip',                          extractName: 'ES.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'ES.zip',                          extractName: 'ES.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'ET'              : [{ remoteFilename: 'ET.zip',                          extractName: 'ET.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'FI'              : [{ remoteFilename: 'FI.zip',                          extractName: 'FI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'FI.zip',                          extractName: 'FI.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'FJ'              : [{ remoteFilename: 'FJ.zip',                          extractName: 'FJ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'FK'              : [{ remoteFilename: 'FK.zip',                          extractName: 'FK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'FM'              : [{ remoteFilename: 'FM.zip',                          extractName: 'FM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'FM.zip',                          extractName: 'FM.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'FO'              : [{ remoteFilename: 'FO.zip',                          extractName: 'FO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'FO.zip',                          extractName: 'FO.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'FR'              : [{ remoteFilename: 'FR.zip',                          extractName: 'FR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'FR.zip',                          extractName: 'FR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'GA'              : [{ remoteFilename: 'GA.zip',                          extractName: 'GA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GB'              : [{ remoteFilename: 'GB.zip',                          extractName: 'GB.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'GB_full.csv.zip',                 extractName: 'GB_full.txt',          zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  },
                         { remoteFilename: 'GB.zip',                          extractName: 'GB.txt',               zipped: true,   type: 'partials',      url: POSTCODES_SERVER_URL,  }],
    'GD'              : [{ remoteFilename: 'GD.zip',                          extractName: 'GD.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GE'              : [{ remoteFilename: 'GE.zip',                          extractName: 'GE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GF'              : [{ remoteFilename: 'GF.zip',                          extractName: 'GF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'GF.zip',                          extractName: 'GF.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'GG'              : [{ remoteFilename: 'GG.zip',                          extractName: 'GG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'GG.zip',                          extractName: 'GG.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'GH'              : [{ remoteFilename: 'GH.zip',                          extractName: 'GH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GI'              : [{ remoteFilename: 'GI.zip',                          extractName: 'GI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GL'              : [{ remoteFilename: 'GL.zip',                          extractName: 'GL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'GL.zip',                          extractName: 'GL.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'GM'              : [{ remoteFilename: 'GM.zip',                          extractName: 'GM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GN'              : [{ remoteFilename: 'GN.zip',                          extractName: 'GN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GP'              : [{ remoteFilename: 'GP.zip',                          extractName: 'GP.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'GP.zip',                          extractName: 'GP.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'GQ'              : [{ remoteFilename: 'GQ.zip',                          extractName: 'GQ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GR'              : [{ remoteFilename: 'GR.zip',                          extractName: 'GR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GS'              : [{ remoteFilename: 'GS.zip',                          extractName: 'GS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GT'              : [{ remoteFilename: 'GT.zip',                          extractName: 'GT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'GT.zip',                          extractName: 'GT.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'GU'              : [{ remoteFilename: 'GU.zip',                          extractName: 'GU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'GU.zip',                          extractName: 'GU.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'GW'              : [{ remoteFilename: 'GW.zip',                          extractName: 'GW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'GY'              : [{ remoteFilename: 'GY.zip',                          extractName: 'GY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'HK'              : [{ remoteFilename: 'HK.zip',                          extractName: 'HK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'HM'              : [{ remoteFilename: 'HM.zip',                          extractName: 'HM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'HN'              : [{ remoteFilename: 'HN.zip',                          extractName: 'HN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'HR'              : [{ remoteFilename: 'HR.zip',                          extractName: 'HR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'HR.zip',                          extractName: 'HR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'HT'              : [{ remoteFilename: 'HT.zip',                          extractName: 'HT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'HU'              : [{ remoteFilename: 'HU.zip',                          extractName: 'HU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'HU.zip',                          extractName: 'HU.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'ID'              : [{ remoteFilename: 'ID.zip',                          extractName: 'ID.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'IE'              : [{ remoteFilename: 'IE.zip',                          extractName: 'IE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'IE.zip',                          extractName: 'IE.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'IL'              : [{ remoteFilename: 'IL.zip',                          extractName: 'IL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'IM'              : [{ remoteFilename: 'IM.zip',                          extractName: 'IM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'IM.zip',                          extractName: 'IM.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'IN'              : [{ remoteFilename: 'IN.zip',                          extractName: 'IN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'IN.zip',                          extractName: 'IN.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'IO'              : [{ remoteFilename: 'IO.zip',                          extractName: 'IO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'IQ'              : [{ remoteFilename: 'IQ.zip',                          extractName: 'IQ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'IR'              : [{ remoteFilename: 'IR.zip',                          extractName: 'IR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'IS'              : [{ remoteFilename: 'IS.zip',                          extractName: 'IS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'IS.zip',                          extractName: 'IS.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'IT'              : [{ remoteFilename: 'IT.zip',                          extractName: 'IT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'IT.zip',                          extractName: 'IT.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'JE'              : [{ remoteFilename: 'JE.zip',                          extractName: 'JE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'JE.zip',                          extractName: 'JE.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'JM'              : [{ remoteFilename: 'JM.zip',                          extractName: 'JM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'JO'              : [{ remoteFilename: 'JO.zip',                          extractName: 'JO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'JP'              : [{ remoteFilename: 'JP.zip',                          extractName: 'JP.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'JP.zip',                          extractName: 'JP.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'KE'              : [{ remoteFilename: 'KE.zip',                          extractName: 'KE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KG'              : [{ remoteFilename: 'KG.zip',                          extractName: 'KG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KH'              : [{ remoteFilename: 'KH.zip',                          extractName: 'KH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KI'              : [{ remoteFilename: 'KI.zip',                          extractName: 'KI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KM'              : [{ remoteFilename: 'KM.zip',                          extractName: 'KM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KN'              : [{ remoteFilename: 'KN.zip',                          extractName: 'KN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KP'              : [{ remoteFilename: 'KP.zip',                          extractName: 'KP.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KR'              : [{ remoteFilename: 'KR.zip',                          extractName: 'KR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'KR.zip',                          extractName: 'KR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'KW'              : [{ remoteFilename: 'KW.zip',                          extractName: 'KW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KY'              : [{ remoteFilename: 'KY.zip',                          extractName: 'KY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'KZ'              : [{ remoteFilename: 'KZ.zip',                          extractName: 'KZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'LA'              : [{ remoteFilename: 'LA.zip',                          extractName: 'LA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'LB'              : [{ remoteFilename: 'LB.zip',                          extractName: 'LB.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'LC'              : [{ remoteFilename: 'LC.zip',                          extractName: 'LC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'LI'              : [{ remoteFilename: 'LI.zip',                          extractName: 'LI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'LI.zip',                          extractName: 'LI.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'LK'              : [{ remoteFilename: 'LK.zip',                          extractName: 'LK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'LK.zip',                          extractName: 'LK.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'LR'              : [{ remoteFilename: 'LR.zip',                          extractName: 'LR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'LS'              : [{ remoteFilename: 'LS.zip',                          extractName: 'LS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'LT'              : [{ remoteFilename: 'LT.zip',                          extractName: 'LT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'LT.zip',                          extractName: 'LT.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'LU'              : [{ remoteFilename: 'LU.zip',                          extractName: 'LU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'LU.zip',                          extractName: 'LU.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'LV'              : [{ remoteFilename: 'LV.zip',                          extractName: 'LV.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'LV.zip',                          extractName: 'LV.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'LY'              : [{ remoteFilename: 'LY.zip',                          extractName: 'LY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'MA'              : [{ remoteFilename: 'MA.zip',                          extractName: 'MA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MC'              : [{ remoteFilename: 'MC.zip',                          extractName: 'MC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MC.zip',                          extractName: 'MC.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MD'              : [{ remoteFilename: 'MD.zip',                          extractName: 'MD.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MD.zip',                          extractName: 'MD.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'ME'              : [{ remoteFilename: 'ME.zip',                          extractName: 'ME.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MF'              : [{ remoteFilename: 'MF.zip',                          extractName: 'MF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MG'              : [{ remoteFilename: 'MG.zip',                          extractName: 'MG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MH'              : [{ remoteFilename: 'MH.zip',                          extractName: 'MH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MH.zip',                          extractName: 'MH.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MK'              : [{ remoteFilename: 'MK.zip',                          extractName: 'MK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MK.zip',                          extractName: 'MK.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'ML'              : [{ remoteFilename: 'ML.zip',                          extractName: 'ML.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MM'              : [{ remoteFilename: 'MM.zip',                          extractName: 'MM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MN'              : [{ remoteFilename: 'MN.zip',                          extractName: 'MN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MO'              : [{ remoteFilename: 'MO.zip',                          extractName: 'MO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MP'              : [{ remoteFilename: 'MP.zip',                          extractName: 'MP.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MP.zip',                          extractName: 'MP.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MQ'              : [{ remoteFilename: 'MQ.zip',                          extractName: 'MQ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MQ.zip',                          extractName: 'MQ.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MR'              : [{ remoteFilename: 'MR.zip',                          extractName: 'MR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MS'              : [{ remoteFilename: 'MS.zip',                          extractName: 'MS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MT'              : [{ remoteFilename: 'MT.zip',                          extractName: 'MT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MT.zip',                          extractName: 'MT.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MU'              : [{ remoteFilename: 'MU.zip',                          extractName: 'MU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MV'              : [{ remoteFilename: 'MV.zip',                          extractName: 'MV.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'MW'              : [{ remoteFilename: 'MW.zip',                          extractName: 'MW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MW.zip',                          extractName: 'MW.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MX'              : [{ remoteFilename: 'MX.zip',                          extractName: 'MX.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MX.zip',                          extractName: 'MX.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MY'              : [{ remoteFilename: 'MY.zip',                          extractName: 'MY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'MY.zip',                          extractName: 'MY.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'MZ'              : [{ remoteFilename: 'MZ.zip',                          extractName: 'MZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'NA'              : [{ remoteFilename: 'NA.zip',                          extractName: 'NA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'NC'              : [{ remoteFilename: 'NC.zip',                          extractName: 'NC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'NC.zip',                          extractName: 'NC.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'NE'              : [{ remoteFilename: 'NE.zip',                          extractName: 'NE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'NF'              : [{ remoteFilename: 'NF.zip',                          extractName: 'NF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'NG'              : [{ remoteFilename: 'NG.zip',                          extractName: 'NG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'NI'              : [{ remoteFilename: 'NI.zip',                          extractName: 'NI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'NL'              : [{ remoteFilename: 'NL.zip',                          extractName: 'NL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'NL_full.csv.zip',                 extractName: 'NL_full.txt',          zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  },
                         { remoteFilename: 'NL.zip',                          extractName: 'NL.txt',               zipped: true,   type: 'partials',      url: POSTCODES_SERVER_URL,  }],

    'NO'              : [{ remoteFilename: 'NO.zip',                          extractName: 'NO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'NO.zip',                          extractName: 'NO.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'NP'              : [{ remoteFilename: 'NP.zip',                          extractName: 'NP.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'NR'              : [{ remoteFilename: 'NR.zip',                          extractName: 'NR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'NU'              : [{ remoteFilename: 'NU.zip',                          extractName: 'NU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'NZ'              : [{ remoteFilename: 'NZ.zip',                          extractName: 'NZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'NZ.zip',                          extractName: 'NZ.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],

    'OM'              : [{ remoteFilename: 'OM.zip',                          extractName: 'OM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'PA'              : [{ remoteFilename: 'PA.zip',                          extractName: 'PA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'PE'              : [{ remoteFilename: 'PE.zip',                          extractName: 'PE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'PF'              : [{ remoteFilename: 'PF.zip',                          extractName: 'PF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'PG'              : [{ remoteFilename: 'PG.zip',                          extractName: 'PG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'PH'              : [{ remoteFilename: 'PH.zip',                          extractName: 'PH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'PH.zip',                          extractName: 'PH.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'PK'              : [{ remoteFilename: 'PK.zip',                          extractName: 'PK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'PK.zip',                          extractName: 'PK.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'PL'              : [{ remoteFilename: 'PL.zip',                          extractName: 'PL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'PL.zip',                          extractName: 'PL.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'PM'              : [{ remoteFilename: 'PM.zip',                          extractName: 'PM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'PM.zip',                          extractName: 'PM.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'PN'              : [{ remoteFilename: 'PN.zip',                          extractName: 'PN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'PR'              : [{ remoteFilename: 'PR.zip',                          extractName: 'PR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'PR.zip',                          extractName: 'PR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'PS'              : [{ remoteFilename: 'PS.zip',                          extractName: 'PS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'PT'              : [{ remoteFilename: 'PT.zip',                          extractName: 'PT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'PT.zip',                          extractName: 'PT.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'PW'              : [{ remoteFilename: 'PW.zip',                          extractName: 'PW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'PW.zip',                          extractName: 'PW.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'PY'              : [{ remoteFilename: 'PY.zip',                          extractName: 'PY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'QA'              : [{ remoteFilename: 'QA.zip',                          extractName: 'QA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'RE'              : [{ remoteFilename: 'RE.zip',                          extractName: 'RE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'RE.zip',                          extractName: 'RE.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'RO'              : [{ remoteFilename: 'RO.zip',                          extractName: 'RO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'RO.zip',                          extractName: 'RO.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'RS'              : [{ remoteFilename: 'RS.zip',                          extractName: 'RS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'RS.zip',                          extractName: 'RS.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'RU'              : [{ remoteFilename: 'RU.zip',                          extractName: 'RU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'RU.zip',                          extractName: 'RU.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'RW'              : [{ remoteFilename: 'RW.zip',                          extractName: 'RW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'SA'              : [{ remoteFilename: 'SA.zip',                          extractName: 'SA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SB'              : [{ remoteFilename: 'SB.zip',                          extractName: 'SB.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SC'              : [{ remoteFilename: 'SC.zip',                          extractName: 'SC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SD'              : [{ remoteFilename: 'SD.zip',                          extractName: 'SD.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SE'              : [{ remoteFilename: 'SE.zip',                          extractName: 'SE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'SE.zip',                          extractName: 'SE.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'SG'              : [{ remoteFilename: 'SG.zip',                          extractName: 'SG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'SG.zip',                          extractName: 'SG.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'SH'              : [{ remoteFilename: 'SH.zip',                          extractName: 'SH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SI'              : [{ remoteFilename: 'SI.zip',                          extractName: 'SI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'SI.zip',                          extractName: 'SI.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'SJ'              : [{ remoteFilename: 'SJ.zip',                          extractName: 'SJ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'SJ.zip',                          extractName: 'SJ.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'SK'              : [{ remoteFilename: 'SK.zip',                          extractName: 'SK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'SK.zip',                          extractName: 'SK.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'SL'              : [{ remoteFilename: 'SL.zip',                          extractName: 'SL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SM'              : [{ remoteFilename: 'SM.zip',                          extractName: 'SM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'SM.zip',                          extractName: 'SM.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'SN'              : [{ remoteFilename: 'SN.zip',                          extractName: 'SN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SO'              : [{ remoteFilename: 'SO.zip',                          extractName: 'SO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SR'              : [{ remoteFilename: 'SR.zip',                          extractName: 'SR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SS'              : [{ remoteFilename: 'SS.zip',                          extractName: 'SS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'ST'              : [{ remoteFilename: 'ST.zip',                          extractName: 'ST.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SV'              : [{ remoteFilename: 'SV.zip',                          extractName: 'SV.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SX'              : [{ remoteFilename: 'SX.zip',                          extractName: 'SX.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SY'              : [{ remoteFilename: 'SY.zip',                          extractName: 'SY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'SZ'              : [{ remoteFilename: 'SZ.zip',                          extractName: 'SZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'TC'              : [{ remoteFilename: 'TC.zip',                          extractName: 'TC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TD'              : [{ remoteFilename: 'TD.zip',                          extractName: 'TD.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TF'              : [{ remoteFilename: 'TF.zip',                          extractName: 'TF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TG'              : [{ remoteFilename: 'TG.zip',                          extractName: 'TG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TH'              : [{ remoteFilename: 'TH.zip',                          extractName: 'TH.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'TH.zip',                          extractName: 'TH.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'TJ'              : [{ remoteFilename: 'TJ.zip',                          extractName: 'TJ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TK'              : [{ remoteFilename: 'TK.zip',                          extractName: 'TK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TL'              : [{ remoteFilename: 'TL.zip',                          extractName: 'TL.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TM'              : [{ remoteFilename: 'TM.zip',                          extractName: 'TM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TN'              : [{ remoteFilename: 'TN.zip',                          extractName: 'TN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TO'              : [{ remoteFilename: 'TO.zip',                          extractName: 'TO.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TR'              : [{ remoteFilename: 'TR.zip',                          extractName: 'TR.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'TR.zip',                          extractName: 'TR.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'TT'              : [{ remoteFilename: 'TT.zip',                          extractName: 'TT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TV'              : [{ remoteFilename: 'TV.zip',                          extractName: 'TV.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TW'              : [{ remoteFilename: 'TW.zip',                          extractName: 'TW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'TZ'              : [{ remoteFilename: 'TZ.zip',                          extractName: 'TZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'UA'              : [{ remoteFilename: 'UA.zip',                          extractName: 'UA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'UA.zip',                          extractName: 'UA.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'UG'              : [{ remoteFilename: 'UG.zip',                          extractName: 'UG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'UM'              : [{ remoteFilename: 'UM.zip',                          extractName: 'UM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'US'              : [{ remoteFilename: 'US.zip',                          extractName: 'US.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'US.zip',                          extractName: 'US.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'UY'              : [{ remoteFilename: 'UY.zip',                          extractName: 'UY.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'UY.zip',                          extractName: 'UY.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'UZ'              : [{ remoteFilename: 'UZ.zip',                          extractName: 'UZ.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'VA'              : [{ remoteFilename: 'VA.zip',                          extractName: 'VA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'VA.zip',                          extractName: 'VA.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'VC'              : [{ remoteFilename: 'VC.zip',                          extractName: 'VC.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'VE'              : [{ remoteFilename: 'VE.zip',                          extractName: 'VE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'VG'              : [{ remoteFilename: 'VG.zip',                          extractName: 'VG.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'VI'              : [{ remoteFilename: 'VI.zip',                          extractName: 'VI.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'VI.zip',                          extractName: 'VI.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'VN'              : [{ remoteFilename: 'VN.zip',                          extractName: 'VN.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'VU'              : [{ remoteFilename: 'VU.zip',                          extractName: 'VU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'WF'              : [{ remoteFilename: 'WF.zip',                          extractName: 'WF.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'WF.zip',                          extractName: 'WF.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'WS'              : [{ remoteFilename: 'WS.zip',                          extractName: 'WS.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'XK'              : [{ remoteFilename: 'XK.zip',                          extractName: 'XK.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],

    'YE'              : [{ remoteFilename: 'YE.zip',                          extractName: 'YE.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'YT'              : [{ remoteFilename: 'YT.zip',                          extractName: 'YT.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'YT.zip',                          extractName: 'YT.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'YU'              : [{ remoteFilename: 'YU.zip',                          extractName: 'YU.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'ZA'              : [{ remoteFilename: 'ZA.zip',                          extractName: 'ZA.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     },
                         { remoteFilename: 'ZA.zip',                          extractName: 'ZA.txt',               zipped: true,   type: 'postcodes',     url: POSTCODES_SERVER_URL,  }],
    'ZM'              : [{ remoteFilename: 'ZM.zip',                          extractName: 'ZM.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }],
    'ZW'              : [{ remoteFilename: 'ZW.zip',                          extractName: 'ZW.txt',               zipped: true,   type: 'cities',        url: CITIES_SERVER_URL,     }]
}

// // Static files to download
// export const STATIC_FILES = [ 'COUNTRIES' ]

// // Country city / postcodes to download
// export const COUNTRY_FILES = [ 'GB', 'NL']


// Static files to download
export const STATIC_FILES = [ 'COUNTRIES' ]

// Country city / postcodes to download
// export const COUNTRY_FILES = [ 'GB' ]
export const COUNTRY_FILES = [ 
   'AT',   // Austria
   'BE',   // Belgium

   'BG',   // Bulgaria
   'CY',   // Cyprus
   'CZ',   // Czechia
   'DE',   // Germany
   'DK',   // Denmark
   'EE',   // Estonia
   'ES',   // Spain
   'FI',   // Finland

   'FR',   // France
   'GB',   // Great Britain
   'GR',   // Greece
   'HR',   // Croatia
   'HU',   // Hungary
   'IE',   // Ireland
   'IT',   // Italy
   'LT',   // Lithuania
   'LV',   // Latvia
   'LU',   // Luxembourg
   'MT',   // Malta
   'NL',   // Netherlands
   'PL',   // Poland
   'PT',   // Portugal
   'RO',   // Romania
   'SK',   // Slovakia
   'SI',   // Slovenia
   'SE',   // Sweden
   'US'    // USA
]
// export const COUNTRY_FILES = [ 
//     'AT',   // Austria
//     'BE',   // Belgium
//     'BG',   // Bulgaria
//     'CY',   // Cyprus
//     'CZ',   // Czechia
//     'DE',   // Germany
//     'DK',   // Denmark
//     'EE',   // Estonia
//     'ES',   // Spain
//     'FI',   // Finland
//     'FR',   // France
//     'GB',   // Great Britain
//     'GR',   // Greece
//     'HR',   // Croatia
//     'HU',   // Hungary
//     'IE',   // Ireland
//     'IT',   // Italy
//     'LT',   // Lithuania
//     'LV',   // Latvia
//     'LU',   // Luxembourg
//     'MT',   // Malta
//     'NL',   // Netherlands
//     'PL',   // Poland
//     'PT',   // Portugal
//     'RO',   // Romania
//     'SK',   // Slovakia
//     'SI',   // Slovenia
//     'SE',   // Sweden
//     'US'    // USA
// ]
