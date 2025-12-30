--
-- Creates the geo_cities table that contains all the cities
--

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
