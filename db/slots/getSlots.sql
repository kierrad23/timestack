SELECT event,minutes,day FROM slots sl
JOIN users usr ON sl.userid = usr.id
WHERE usr.authid = '111' AND day = $1