SELECT sl.id,event,minutes,date FROM slots sl
JOIN users usr ON sl.userid = usr.id
WHERE sl.userid = $1 AND date = $2
ORDER BY id ASC;