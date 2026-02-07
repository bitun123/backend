const express = require("express");
const userModels = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
authRouter.post("/Register", async (req, res) => {
  const { name, email, password } = req.body;
  const isEmailAvailable = await userModels.findOne({ email });
  if (isEmailAvailable) {
    return res.status(409).json({
      message: "mail id is already exists",
    });
  }


  const hash = crypto.createHash("md5").update(password).digest("hex")
  const user = await userModels.create({
    name,
    email,
    password:hash
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "Register successfully",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModels.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "mail id is not available",
    });
  }
  const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "password not match",
    });
  }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );
    res.cookie("jwt_token",token);
    res.status(201).json({
        message : "login successfully",
        user,
        token
    })
});

module.exports = authRouter;
