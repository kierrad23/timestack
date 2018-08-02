INSERT INTO slots(userid,event,minutes,date)
values($1,$2,$3,$4);
SELECT event,minutes,date FROM slots sl
JOIN users usr ON sl.userid = usr.id
WHERE sl.userid = $1 AND date = $4