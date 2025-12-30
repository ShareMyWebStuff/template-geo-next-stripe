--
-- Creates the geo_locations table that contains all the locations (cities, partial postcodes and postcodes)
--
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
