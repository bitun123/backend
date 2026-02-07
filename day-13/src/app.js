const express = require("express");
const authRouter = require("./router/auth.router");
const cookie = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookie());
app.use("/api/auth", authRouter);
module.exports = app;
