//write the all server related code
const noteModel = require("./config/models/notes.models")
const express = require("express");

const app = express();
// using the middileware
app.use(express.json())

// create note using post method and status code is  201 and models method is create 
// path api/notes
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body

const note = await noteModel.create({
    title,
    description
})


res.status(201).json({
    message :"note create successfully",
    note
})
})

// get the data from the database
app.get("/api/notes",async(req,res)=>{
    const note = await  noteModel.find();
    res.status(200).json({
message :"successfully",
note
    })
})


//delete notes from the database
app.delete("/api/notes/:id",async(req,res)=>{
    const id  = req.params.id;
   await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "notes deleted successfully "
    })
})

// delete particular part from the note
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    let {description} = req.body
    const note = await noteModel.findByIdAndUpdate(id,{description});
    res.status(200).json({
        message :"successfully update"
    })
})




module.exports = app