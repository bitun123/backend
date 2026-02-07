const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: "string",
  email: {
    type: "string",
    unique: [true, "mail id already exists"],
  },
  password: "string",
});

const userModels = mongoose.model("users", userSchema);
module.exports = userModels;
