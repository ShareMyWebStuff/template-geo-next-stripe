--
-- Creates the import_city_differences table for holding the differences between the import and geo cities tables
--
CREATE TABLE IF NOT EXISTS import_city_differences (
    city_id 		INT 			NOT NULL,
    status    		CHAR(1)			NOT NULL,
    moved			CHAR(1)			NOT NULL,

	UNIQUE INDEX idx_name (city_id, status)
	
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
