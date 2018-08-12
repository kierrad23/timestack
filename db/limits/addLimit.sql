INSERT INTO limits(userid,event,elimit)
values($1,$2,$3);
SELECT * FROM limits
WHERE userid = $1;