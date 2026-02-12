const userModels = require("../models/user.models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
async function registerControllers(req, res) {
  //Destructure from the req.body
  const { userName, email, password, bio, profileImage } = req.body;

  //check user already exists base on email or password
  const isUserExists = await userModels.findOne({
    $or: [
      { email },
      {
        userName,
      },
    ],
  });
  if (isUserExists) {
    return res.status(409).json({
      message: "user is already exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  //   create data from the db
  const user = await userModels.create({
    userName,
    email,
    password: hash,
    bio,
    profileImage,
  });

  //   token generate using jwt secret
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //save the token from the cookie using the cookie-parser
  res.cookie("jwt-token", token);
  res.status(201).json({
    userName,
    email,
    bio,
    profileImage,
    token,
  });
}

async function loginControllers(req, res) {
  const { userName, email, password } = req.body;

  const user = await userModels.findOne({
    $or: [{ userName: userName }, { email: email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "user not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordExists = hash == user.password;
  if (!isPasswordExists) {
    return res.status(401).json({
      message: "password Invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("jwt-token", token);

  res.status(200).json({
    message: "Login successfully",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            },
    token,
  });
}

module.exports = {
  registerControllers,
  loginControllers,
};
