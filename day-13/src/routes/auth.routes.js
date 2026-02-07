const express = require("express");
const userModels = require("../models/user.models");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/Register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAvailable = await userModels.findOne({ email });
  if (isUserAvailable) {
    return res.status(409).json({
      message: "mail is already exists",
    });
  }

  const users = await userModels.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: users._id,
      email: users.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "register successfully",
    users,
    token,
  });
});

// controller
authRouter.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModels.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user not found with this email",
    });
  }

  const isPassword = user.password === password;
  if (!isPassword) {
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

  res.status(201).json({
    message: "login Successfully",
    user,
    token,
  });
});

module.exports = authRouter;
