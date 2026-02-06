const express = require("express");
const authModels = require("../models/auth.model");
const jwt = require("jsonwebtoken")

const authRoute = express.Router();


authRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body



  const isUserAvailable= await authModels.findOne({email});
  if(isUserAvailable) {
    return res.status(400).json({
        message : " mail is already exists"
    })
  }

  const user = await authModels.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
        id : user._id,
        email : user.email
    },
    process.env.JWT_SECRET

  )
res.cookie("jwt_token",token)

  res.status(201).json({
    message: " user register successfully",
    user,
    token
  });
});


authRoute.get("/register",async(req,res)=>{

  const userData = await authModels.find();
  const cookieToken = await req.cookies.jwt_token;
  if(cookieToken){
    res.status(200).json({
      message : "data retrive successfully",
      userData,
      cookieToken
    })
  }
})


module.exports = authRoute;
