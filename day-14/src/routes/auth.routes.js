const express = require("express");
const authRouter = express.Router();
const authControllers = require("../Controllers/auth.controller");

authRouter.post("/Register", authControllers.registerControllers);
authRouter.post("/Login", authControllers.loginControllers);
module.exports = authRouter;
