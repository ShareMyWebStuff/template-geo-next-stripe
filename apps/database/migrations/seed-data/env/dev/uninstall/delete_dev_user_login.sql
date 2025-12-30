/*
Table       : user_login

Description : This script deletes the admin users on user_login

**/
DELETE FROM user_login WHERE user_id between 10000 AND 40000;
