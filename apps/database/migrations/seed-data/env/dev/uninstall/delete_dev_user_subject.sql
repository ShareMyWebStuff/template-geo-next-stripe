/*
Table       : user_subject

Description : This script deletes the admin users on user_subject

**/
DELETE FROM user_subject WHERE user_id between 10000 AND 40000;
