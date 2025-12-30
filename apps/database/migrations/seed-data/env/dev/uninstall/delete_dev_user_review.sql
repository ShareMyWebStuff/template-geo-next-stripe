/*
Table       : user_review

Description : This script deletes the admin users on user_review

**/
DELETE FROM user_review WHERE user_id between 10000 AND 40000;
