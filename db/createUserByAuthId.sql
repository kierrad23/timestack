INSERT INTO users(name,authid)
values($1,$2)
RETURNING id;