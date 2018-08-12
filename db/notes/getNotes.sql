SELECT * FROM notes 
WHERE userid = $1 
ORDER BY date::DATE DESC;
