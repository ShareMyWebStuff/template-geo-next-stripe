--
-- Creates the geo_cities table that contains all the cities
--
CREATE TABLE user (
    id                  VARCHAR(36)     NOT NULL	PRIMARY KEY, 
    name                VARCHAR(255)    NOT NULL, 
    email               VARCHAR(255)    NOT NULL	UNIQUE, 
    emailVerified       BOOLEAN         NOT NULL, 
    accountType         CHAR(1)         NOT NULL    default(' '),
    agreedAccountChecks BOOLEAN         NOT NULL    DEFAULT(0), 
    image               TEXT, 
    createdAt           timestamp(3)    DEFAULT CURRENT_TIMESTAMP(3)    NOT NULL, 
    updatedAt           timestamp(3)    DEFAULT CURRENT_TIMESTAMP(3)    NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
