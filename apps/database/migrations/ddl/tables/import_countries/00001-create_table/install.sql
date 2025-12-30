--
-- Creates the import_countries table that contains all the countries in the world
--
-- country_id   is the geoname id
-- ctry_code    2 character code
-- iso3         the iso 3 character code for the country
-- country      the name of the country
CREATE TABLE IF NOT EXISTS import_countries 
(
    country_id              INTEGER         NOT NULL,
    ctry_code               CHAR(2)         NOT NULL,
    iso3                    CHAR(3)         NOT NULL,
    country                 VARCHAR(50)     NOT NULL,

    PRIMARY KEY (ctry_code)
) ENGINE=MyISAM DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
