/*
Table       : lan_language

Description : This script loads all the languages into the lan_language table from an S3 file

**/
LOAD DATA FROM S3 's3-<<S3_REGION>>://<<S3_BUCKET_NAME>>/data/lan/lan_language.csv'
REPLACE INTO TABLE lan_language
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';

-- Windows \r\n, unix / github the other
-- LINES TERMINATED BY '\r\n';
-- LINES TERMINATED BY '\n';
