--
-- Creates the geo_better auth session table that contains all the sessions
--
create table session (
    id			VARCHAR(36)		NOT NULL	PRIMARY KEY, 
    expiresAt	TIMESTAMP(3)	NOT NULL, 
    token		VARCHAR(255)	NOT NULL	UNIQUE, 
    createdAt	TIMESTAMP(3)	DEFAULT CURRENT_TIMESTAMP(3)	NOT NULL, 
    updatedAt	TIMESTAMP(3)	NOT NULL, 
    ipAddress	TEXT, 
    userAgent	TEXT, 
    userId		VARCHAR(36)		NOT NULL	REFERENCES user(id) ON DELETE CASCADE,

	INDEX	idx_user_id (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
