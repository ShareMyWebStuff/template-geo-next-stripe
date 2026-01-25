--
-- Creates the geo_cities table that contains all the cities
--
CREATE TABLE verification (
    id			varchar(36)		NOT NULL	PRIMARY KEY, 
    identifier	varchar(255)	NOT NULL, 
    value		TEXT			NOT NULL, 
    expiresAt	TIMESTAMP(3)	NOT NULL, 
    createdAt	TIMESTAMP(3)	DEFAULT CURRENT_TIMESTAMP(3) NOT NULL, 
    updatedAt	TIMESTAMP(3)	DEFAULT	CURRENT_TIMESTAMP(3) NOT NULL,
    INDEX idx_identifier	(identifier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

