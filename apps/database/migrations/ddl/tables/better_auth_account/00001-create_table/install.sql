--
-- Creates the geo_cities table that contains all the cities
--
CREATE TABLE account (
	id						VARCHAR (36)	NOT NULL	PRIMARY KEY, 
	accountId				TEXT			NOT NULL, 
	providerId				TEXT			NOT NULL, 
	userId					VARCHAR (36)	NOT NULL	REFERENCES user (id) on delete cascade, 
	accessToken				text, 
	refreshToken			text, 
	idToken					text, 
	accessTokenExpiresAt 	TIMESTAMP(3), 
	refreshTokenExpiresAt	timestamp(3), `scope` text, 
	password text, 
	createdAt timestamp(3) default CURRENT_TIMESTAMP(3) not null, 
	updatedAt timestamp(3) not null
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
