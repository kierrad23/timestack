UPDATE notes 
SET note = $3
WHERE id = $1;
SELECT * FROM notes
WHERE userid = $2
ORDER BY date::DATE DESC;