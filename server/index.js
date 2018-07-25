const express = require("express");
const bp = require("body-parser");
// const cors = require('cors')
const app = express();
const massive = require("massive");
require("dotenv").config();
const ctrl = require("./ctrl");

app.use(bp.json());
// app.use(cors())

massive(process.env.CSTRING).then(db => {
  app.set("db", db);
});

app.get("/api/dashboard/:day", ctrl.getSlots);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(port));
