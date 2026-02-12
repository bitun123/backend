const express = require("express");
require("./routes/auth.route")
const app = express();
app.use(express.json())
module.exports = app;
