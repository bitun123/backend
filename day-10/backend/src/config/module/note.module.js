const mongoose = require("mongoose");

//create schema
const noteSchema = new mongoose.Schema({
  title: "string",
  description: "string",
});

//create model

const noteModel = mongoose.model("note", noteSchema);
module.exports = noteModel;
