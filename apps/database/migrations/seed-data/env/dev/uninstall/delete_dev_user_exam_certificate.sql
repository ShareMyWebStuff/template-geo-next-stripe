/*
Table       : user_exam_certificate

Description : This script deletes the admin users on user_exam_certificate

**/
DELETE FROM user_exam_certificate WHERE user_id between 10000 AND 40000;
