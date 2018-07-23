const express = require("express");
const bp = require("body-parser");
// const cors = require('cors')
const app = express();
const massive = require("massive");
require("dotenv").config();

app.use(bp.json());
// app.use(cors())

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(port));
