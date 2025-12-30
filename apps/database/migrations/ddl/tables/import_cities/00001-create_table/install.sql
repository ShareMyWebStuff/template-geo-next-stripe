--
-- Creates the import_cities table for loading data files into
--
CREATE TABLE IF NOT EXISTS import_cities (
    geoname_id          INT             NOT NULL    PRIMARY KEY,
    name                VARCHAR(200),
    search_name         VARCHAR(200)    NOT NULL    DEFAULT(''),
    country_code        CHAR(2),
    admin1_code         VARCHAR(20),
    admin2_code         VARCHAR(80),
    admin3_code         VARCHAR(20),
    admin4_code         VARCHAR(20),
	latitude            DECIMAL(10,6),
	longitude           DECIMAL(10,6),

    north_lat           DECIMAL(10,6)	NULL,
    south_lat           DECIMAL(10,6)	NULL,
    east_long           DECIMAL(10,6)	NULL,
    west_long           DECIMAL(10,6)	NULL,
    modification_date BIGINT,
    
	geo_location 		POINT SRID 4326 NOT NULL,
    SPATIAL INDEX(geo_location),

    status              CHAR(1)         NOT NULL    DEFAULT('N')

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
