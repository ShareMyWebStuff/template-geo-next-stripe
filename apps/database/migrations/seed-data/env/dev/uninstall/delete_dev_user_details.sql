/*
Table       : user_details

Description : This script deletes the admin users on user_details

**/
DELETE FROM user_details WHERE user_id between 10000 AND 40000;
