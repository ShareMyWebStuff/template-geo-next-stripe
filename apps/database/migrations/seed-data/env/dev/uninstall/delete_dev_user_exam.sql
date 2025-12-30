/*
Table       : user_exam

Description : This script deletes the admin users on user_exam

**/
DELETE FROM user_exam WHERE user_id between 10000 AND 40000;
