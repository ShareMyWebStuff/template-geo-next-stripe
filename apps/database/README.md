DROP TABLE IF EXISTS imp_countries;
DROP TABLE IF EXISTS import_cities;
DROP TABLE IF EXISTS import_partials;
DROP TABLE IF EXISTS import_postcodes;

DROP TABLE IF EXISTS geo_locations ;

CREATE TABLE IF NOT EXISTS imp_countries 
(
    country_id              INTEGER         NOT NULL,
    ctry_code               CHAR(2)         NOT NULL,
    iso3                    CHAR(3)         NOT NULL,
    country                 VARCHAR(50)     NOT NULL,

    PRIMARY KEY (ctry_code)
) ENGINE=MyISAM DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS import_cities (
    geoname_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(200),
    search_name VARCHAR(200) NOT NULL DEFAULT(''),
    country_code CHAR(2),
    admin1_code VARCHAR(20),
    admin2_code VARCHAR(80),
    admin3_code VARCHAR(20),
    admin4_code VARCHAR(20),
	latitude DECIMAL(10,6),
	longitude DECIMAL(10,6),

    north_lat DECIMAL(10,6)		NULL,
    south_lat DECIMAL(10,6)		NULL,
    east_long DECIMAL(10,6)		NULL,
    west_long DECIMAL(10,6)		NULL,
    modification_date BIGINT,
    
	geo_location 		POINT SRID 4326 	NOT NULL,
    SPATIAL INDEX(geo_location),

    status CHAR(1) NOT NULL DEFAULT('N')

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS import_partials (
    postcode VARCHAR(200),
    place_name VARCHAR(200) NOT NULL DEFAULT(''),
    search_name VARCHAR(200) NOT NULL DEFAULT(''),
    country_code CHAR(2),
    nearest_place INT NULL,
	latitude DECIMAL(10,6),
	longitude DECIMAL(10,6),
    north_lat DECIMAL(10,6)		NULL,
    south_lat DECIMAL(10,6)		NULL,
    east_long DECIMAL(10,6)		NULL,
    west_long DECIMAL(10,6)		NULL,
    status CHAR(1) NOT NULL DEFAULT('N')

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS import_postcodes (
    postcode VARCHAR(200),
    place_name VARCHAR(200) NOT NULL DEFAULT(''),
    search_name VARCHAR(200) NOT NULL DEFAULT(''),
    country_code CHAR(2),
    nearest_place INT NULL,
	latitude DECIMAL(10,6),
	longitude DECIMAL(10,6),
    north_lat DECIMAL(10,6)		NULL,
    south_lat DECIMAL(10,6)		NULL,
    east_long DECIMAL(10,6)		NULL,
    west_long DECIMAL(10,6)		NULL,
    status CHAR(1) NOT NULL DEFAULT('N')

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS geo_locations;
-- location  
CREATE TABLE IF NOT EXISTS geo_locations (
    location_id 	INT 			NOT NULL AUTO_INCREMENT	 PRIMARY KEY,	-- unique id
    location 		VARCHAR(200) 	NOT NULL,					-- city name or postcode
	country_code 	CHAR(2)			NOT NULL,					-- country code
    city_postcode	CHAR(1)			NOT NULL,					-- whether its a city or postcode

    city_id			INT 			NULL,					    -- city unique id

	-- Where the location is
	latitude DECIMAL(10,6),
	longitude DECIMAL(10,6),

	-- 15 mile border around the location
    north_lat DECIMAL(10,6)		NULL,
    south_lat DECIMAL(10,6)		NULL,
    east_long DECIMAL(10,6)		NULL,
    west_long DECIMAL(10,6)		NULL,
    
	INDEX idx_location (location),
	INDEX idx_country_location (country_code, city_postcode, location)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS geo_cities;
-- location  
CREATE TABLE IF NOT EXISTS geo_cities (
    city_id 		INT 			NOT NULL AUTO_INCREMENT	 PRIMARY KEY,	-- unique id
    city_name 		VARCHAR(200) 	NOT NULL,					-- city name or postcode
	country_code 	CHAR(2)			NOT NULL,					-- country code

	-- Where the location is
	latitude DECIMAL(10,6),
	longitude DECIMAL(10,6),

-- 	-- 15 mile border around the location
--     north_lat DECIMAL(10,6)		NULL,
--     south_lat DECIMAL(10,6)		NULL,
--     east_long DECIMAL(10,6)		NULL,
--     west_long DECIMAL(10,6)		NULL,
    
    geo_location 		POINT SRID 4326 	NOT NULL,

    SPATIAL INDEX(geo_location),
    
	INDEX idx_name (city_name),
	INDEX idx_country_name (country_code, city_name)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Static files
LOAD DATA INFILE 'D://geonames_datafile//countries.txt'    INTO TABLE imp_countries    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n';

-- Load files for country code (AT)
LOAD DATA INFILE 'D://geonames_datafile//cities-AT.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-AT.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (BE)
LOAD DATA INFILE 'D://geonames_datafile//cities-BE.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-BE.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (BG)
LOAD DATA INFILE 'D://geonames_datafile//cities-BG.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-BG.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (CY)
LOAD DATA INFILE 'D://geonames_datafile//cities-CY.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);

-- Load files for country code (CZ)
LOAD DATA INFILE 'D://geonames_datafile//cities-CZ.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-CZ.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (DE)
LOAD DATA INFILE 'D://geonames_datafile//cities-DE.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-DE.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (DK)
LOAD DATA INFILE 'D://geonames_datafile//cities-DK.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-DK.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (EE)
LOAD DATA INFILE 'D://geonames_datafile//cities-EE.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-EE.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (ES)
LOAD DATA INFILE 'D://geonames_datafile//cities-ES.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-ES.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (FI)
LOAD DATA INFILE 'D://geonames_datafile//cities-FI.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-FI.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (FR)
LOAD DATA INFILE 'D://geonames_datafile//cities-FR.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-FR.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (GB)
LOAD DATA INFILE 'D://geonames_datafile//cities-GB.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-GB.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );
LOAD DATA INFILE 'D://geonames_datafile//partials-GB.txt'  INTO TABLE import_partials  FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (GR)
LOAD DATA INFILE 'D://geonames_datafile//cities-GR.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);

-- Load files for country code (HR)
LOAD DATA INFILE 'D://geonames_datafile//cities-HR.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-HR.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (HU)
LOAD DATA INFILE 'D://geonames_datafile//cities-HU.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-HU.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (IE)
LOAD DATA INFILE 'D://geonames_datafile//cities-IE.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-IE.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (IT)
LOAD DATA INFILE 'D://geonames_datafile//cities-IT.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-IT.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (LT)
LOAD DATA INFILE 'D://geonames_datafile//cities-LT.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-LT.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (LV)
LOAD DATA INFILE 'D://geonames_datafile//cities-LV.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-LV.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (LU)
LOAD DATA INFILE 'D://geonames_datafile//cities-LU.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-LU.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (MT)
LOAD DATA INFILE 'D://geonames_datafile//cities-MT.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-MT.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (NL)
LOAD DATA INFILE 'D://geonames_datafile//cities-NL.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-NL.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );
LOAD DATA INFILE 'D://geonames_datafile//partials-NL.txt'  INTO TABLE import_partials  FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (PL)
LOAD DATA INFILE 'D://geonames_datafile//cities-PL.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-PL.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (PT)
LOAD DATA INFILE 'D://geonames_datafile//cities-PT.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-PT.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (RO)
LOAD DATA INFILE 'D://geonames_datafile//cities-RO.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-RO.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (SK)
LOAD DATA INFILE 'D://geonames_datafile//cities-SK.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-SK.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (SI)
LOAD DATA INFILE 'D://geonames_datafile//cities-SI.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-SI.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (SE)
LOAD DATA INFILE 'D://geonames_datafile//cities-SE.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-SE.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

-- Load files for country code (US)
LOAD DATA INFILE 'D://geonames_datafile//cities-US.txt'    INTO TABLE import_cities    FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( geoname_id, name, search_name, country_code, admin1_code, admin2_code, admin3_code, admin4_code, latitude, longitude, north_lat, south_lat, east_long, west_long, modification_date ) SET geo_location = ST_SRID(POINT(longitude, latitude), 4326);
LOAD DATA INFILE 'D://geonames_datafile//postcodes-US.txt' INTO TABLE import_postcodes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' ( postcode, place_name, search_name, country_code, nearest_place, latitude, longitude, north_lat, south_lat, east_long, west_long );

DROP TABLE IF EXISTS geo_locations;
-- location  
CREATE TABLE IF NOT EXISTS geo_locations (
    location_id 	INT 			NOT NULL AUTO_INCREMENT	 PRIMARY KEY,	-- unique id
    location 		VARCHAR(200) 	NOT NULL,					-- city name or postcode
	country_code 	CHAR(2)			NOT NULL,					-- country code
    city_postcode	CHAR(1)			NOT NULL,					-- whether its a city or postcode

    city_id			INT 			NULL,					    -- city unique id

	-- Where the location is
	latitude DECIMAL(10,6),
	longitude DECIMAL(10,6),

	-- 15 mile border around the location
    north_lat DECIMAL(10,6)		NULL,
    south_lat DECIMAL(10,6)		NULL,
    east_long DECIMAL(10,6)		NULL,
    west_long DECIMAL(10,6)		NULL,
    
--     geo_location 		POINT SRID 4326 	NOT NULL, 

--     SPATIAL INDEX(geo_location),
    
	INDEX idx_location (location),
	INDEX idx_country_location (country_code, city_postcode, location)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;


DROP TABLE IF EXISTS geo_cities;
-- location  
CREATE TABLE IF NOT EXISTS geo_cities (
    city_id 		INT 			NOT NULL  PRIMARY KEY,	-- unique id
    city_name 		VARCHAR(200) 	NOT NULL,					-- city name or postcode
	country_code 	CHAR(2)			NOT NULL,					-- country code

	-- Where the location is
	latitude DECIMAL(10,6),
	longitude DECIMAL(10,6),

-- 	-- 15 mile border around the location
--     north_lat DECIMAL(10,6)		NULL,
--     south_lat DECIMAL(10,6)		NULL,
--     east_long DECIMAL(10,6)		NULL,
--     west_long DECIMAL(10,6)		NULL,
    
    geo_location 		POINT SRID 4326 	NOT NULL,

    SPATIAL INDEX(geo_location),
    
	INDEX idx_name (city_name),
	INDEX idx_country_name (country_code, city_name),
	INDEX idx_coord (latitude, longitude)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS import_city_differences;
-- location  
CREATE TABLE IF NOT EXISTS import_city_differences (
    city_id 		INT 			NOT NULL,
    status    		CHAR(1)			NOT NULL,
    moved			CHAR(1)			NOT NULL,

	UNIQUE INDEX idx_name (city_id, status)
	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

TRUNCATE TABLE import_city_differences;

--
-- We only need to capture the cities deleted with their coords, so we can replace these
--   - Insert all new cities and locations
--   - 
--

-- Updates cities
INSERT INTO import_city_differences ( city_id, status, moved )
SELECT  gc.city_id, 'U' AS status, CASE WHEN gc.latitude != ic.latitude OR gc.longitude != ic.longitude THEN 'Y' ELSE 'N' END AS moved
FROM	geo_cities gc
        INNER JOIN import_cities ic ON gc.city_id = ic.geoname_id
WHERE	gc.city_name    != ic.search_name
OR      gc.country_code != ic.country_code
OR      gc.latitude     != ic.latitude
OR      gc.longitude    != ic.longitude;

-- New cities
INSERT INTO geo_cities ( city_id, city_name, country_code, latitude, longitude, geo_location )
SELECT  ic.geoname_id, ic.search_name, ic.country_code, ic.latitude, ic.longitude, ST_SRID(POINT(ic.longitude, ic.latitude), 4326) AS geo_location
FROM	import_cities ic
        LEFT OUTER JOIN geo_cities gc ON gc.city_id = ic.geoname_id
WHERE   gc.city_id IS NULL;

-- Deleted citites
INSERT INTO import_city_differences ( city_id, status, moved )
SELECT  gc.city_id, 'U' AS status, 'N' AS moved
FROM	geo_cities gc
        LEFT OUTER JOIN import_cities ic ON gc.city_id = ic.geoname_id
WHERE   ic.search_name IS NULL;

UPDATE  geo_cities gc
INNER JOIN import_cities ic ON gc.city_id = ic.geoname_id
INNER JOIN import_city_differences icd ON gc.city_id = icd.city_id
										AND icd.status = 'U'
SET   	gc.city_name    = ic.search_name,
		gc.country_code = ic.country_code,
        gc.latitude     = ic.latitude,
		gc.longitude    = ic.longitude;

DELETE
FROM    gc
USING 	geo_cities gc
		INNER JOIN import_cities ic ON gc.city_id = ic.geoname_id
        INNER JOIN import_city_differences icd 	ON 	gc.city_id = icd.city_id
												AND	icd.status = 'D';
SELECT * FROM import_city_differences;

-- SELECT * FROM geo_cities WHERE country_code = 'GB';

-- -- UPDATE - Abbess Roding - just name
-- UPDATE geo_cities
-- SET    city_name = 'Poop'
-- WHERE  city_id = 2657881;

-- -- UPDATE - Abberley - moved
-- UPDATE geo_cities
-- SET    latitude = 52.30796
-- WHERE  city_id = 2657878;

-- -- INSERT - Abbey Green
-- DELETE FROM geo_cities WHERE city_id = 13274343;

-- -- DELETE
-- DELETE FROM import_cities WHERE geoname_id = 13272471;


--
-- Populate locations
--
INSERT INTO geo_locations ( location, country_code, city_postcode, city_id, latitude, longitude, north_lat, south_lat, east_long, west_long )
SELECT	search_name, country_code, 'C', geoname_id, latitude, longitude, north_lat, south_lat, east_long, west_long
FROM	import_cities;

INSERT INTO geo_locations ( location, country_code, city_postcode, city_id, latitude, longitude, north_lat, south_lat, east_long, west_long )
SELECT  CONCAT (postcode, CASE WHEN search_name = '' THEN '' ELSE CONCAT(' ( ', search_name, ' )') END) AS location, 
		country_code, 'S', NULL, latitude, longitude, north_lat, south_lat, east_long, west_long
FROM	import_partials;


INSERT INTO geo_locations ( location, country_code, city_postcode, city_id, latitude, longitude, north_lat, south_lat, east_long, west_long )
SELECT  CONCAT (postcode, CASE WHEN search_name = '' THEN '' ELSE CONCAT(' ( ', search_name, ' )') END) AS location, 
		country_code, 'S', NULL, latitude, longitude, north_lat, south_lat, east_long, west_long
FROM	import_postcodes;












-- SELECT * FROM import_cities;
-- select * FROM import_partials where postcode = 'gu22';
-- select * FROM import_postcodes;
-- SELECT * FROM geo_locations where location = 'woking';

select * from geo_locations where location like 'gu22%';

SELECT longitude, latitude, south_lat, north_lat, west_long, east_long
INTO @lon, @lat, @min_lat, @max_lat, @min_lon, @max_lon
FROM geo_locations
-- where location = 'GU22 ( Old Woking )';
where location = 'woking';
-- 51.321230	-0.572150

SELECT 
    city_id, city_name, latitude, longitude,
    ST_Distance_Sphere(
        geo_location, 
        ST_SRID(POINT(@lon, @lat), 4326)
    ) / 1000 AS distance_km
FROM 	geo_cities l
WHERE latitude between @min_lat and @max_lat
AND   longitude between @min_lon and @max_lon
AND   ST_Distance_Sphere(
          geo_location, 
          ST_SRID(POINT(@lon, @lat), 4326)
      ) < 15000  -- e.g., filter within 300 km
-- ORDER BY distance_km;



