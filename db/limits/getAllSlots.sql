SELECT
  id,event,minutes,date
FROM
  slots
WHERE
userid = $1 AND
      date >= $2 
  AND date <=  $3
  ORDER BY date::DATE ASC;