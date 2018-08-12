UPDATE slots 
SET minutes = $2
WHERE id = $1;
SELECT id,event,minutes,date FROM slots
WHERE userid = $3 AND date = $4
ORDER BY id ASC;