DELETE FROM notes 
WHERE userid = $1 AND id = $2;
SELECT * FROM notes
WHERE userid = $1
ORDER BY date::DATE DESC;