const express = require("express");
const userModels = require("../models/user.models");
const jwt = require("jsonwebtoken")

const authRouter = express.Router();

authRouter.post("/Register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAvailable = await userModels.findOne({ email });
  if (isUserAvailable) {
    return res.status(409).json({
      message: "mail is already exists",
    });
  }

const user = await userModels.create({
    name,email,password
})


const token = jwt.sign(
    {
        id : user._id,
        email : user.email
    }
    ,
    process.env.JWT_SECRET
)
res.cookie("jwt_token" , token)


res.status(201).json({
    message : "register successfully",
    user,
    token
})




});
 

module.exports = authRouter