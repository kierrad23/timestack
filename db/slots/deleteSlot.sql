DELETE FROM slots 
WHERE userid = $1 AND id = $2;
SELECT id,event,minutes,date FROM slots
WHERE userid = $1 AND date = $3
ORDER BY id ASC;