/*
Table       : sub_level_category

Description : This script loads all the subjects into the sub_level_category table from an S3 file

**/
LOAD DATA FROM S3 's3-<<S3_REGION>>://<<S3_BUCKET_NAME>>/data/sub/sub_level_category.csv'
REPLACE INTO TABLE sub_level_category
CHARACTER SET 'utf8'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';

-- Windows \r\n, unix / github the other
-- LINES TERMINATED BY '\r\n';
-- LINES TERMINATED BY '\n';

