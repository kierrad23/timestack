INSERT INTO slots(userid,event,minutes,date)
values($1,$2,$3,$4);
SELECT id,event,minutes,date FROM slots
WHERE userid = $1 AND date = $4
ORDER BY id ASC;