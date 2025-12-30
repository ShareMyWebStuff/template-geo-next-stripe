/*
Table       : user_language

Description : This script deletes the admin users on user_language

**/
DELETE FROM user_language WHERE user_id between 10000 AND 40000;
