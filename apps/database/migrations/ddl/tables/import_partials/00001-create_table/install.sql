--
-- Creates the import_partials table used to load partial postcode data files
--
CREATE TABLE IF NOT EXISTS import_partials (
    postcode        VARCHAR(200),
    place_name      VARCHAR(200)    NOT NULL    DEFAULT(''),
    search_name     VARCHAR(200)    NOT NULL    DEFAULT(''),
    country_code    CHAR(2),
    nearest_place   INT NULL,
	latitude        DECIMAL(10,6),
	longitude       DECIMAL(10,6),
    north_lat       DECIMAL(10,6)	NULL,
    south_lat       DECIMAL(10,6)	NULL,
    east_long       DECIMAL(10,6)	NULL,
    west_long       DECIMAL(10,6)	NULL,
    status          CHAR(1)         NOT NULL    DEFAULT('N')

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
