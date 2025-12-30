/*
Table       : user_about

Description : This script deletes the admin users on user_about

**/
DELETE FROM user_about WHERE user_id between 10000 AND 19999 OR user_id between 40000 AND 49999;
