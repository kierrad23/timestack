INSERT INTO notes(userid,note,date)
values($1,$2,$3);
SELECT * FROM notes
WHERE userid = $1
ORDER BY date::DATE DESC;