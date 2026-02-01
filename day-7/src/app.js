const express = require("express");
const noteModel = require("./models/notes.models");
//call the express
const app = express();
app.use(express.json());

// create resource using post method and status code is 201 path is /notes
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "notes create successfully",
    note,
  });
});

//to read  using get method and status code is 200 the data from the database using find method
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "read notes successfully",
    notes,
  });
});

// export the app
module.exports = app;
