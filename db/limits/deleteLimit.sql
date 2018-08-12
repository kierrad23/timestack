DELETE FROM limits 
WHERE userid = $1 AND id = $2;
SELECT * FROM limits
WHERE userid = $1;