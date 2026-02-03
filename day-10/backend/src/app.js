//require the express
const express = require("express");

//require noteModel
const noteModel = require("./config/module/note.module");

//require cors
const cors = require("cors")


//require path
const path = require("path")


//


//call the express and store in app variable
const app = express();


// use cors middleware
app.use(cors())
app.use(express.static("./public"))

// use middleware
app.use(express.json());

//create note API using post method and status code is 201 db model is create and the api path is (/api/notes)
app.post("/api/notes",async (req, res) => {
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

//create api using this api get the data from the database using get method and status code is 200 and path is (/api/notes)
app.get("/api/notes",async (req,res)=>{
    const note =await noteModel.find();
    res.status(200).json({
        message : "results get successfully",
        note
    })
})

//delete the note using delete method and status code 204 and model method is findbyiDand delete

app.delete("/api/notes/:id", async (req,res)=>{
    const id  = req.params.id;
    const note =  await noteModel.findByIdAndDelete(id);
    res.status(204).json({
        message :" note delete successfully",
    })
})



//create a api that is update the perticuler note description

app.patch("/api/notes/:id",async (req,res)=>{
    const id =  req.params.id;
    const {description} = req.body;
    const note = await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message : "notes update successfully",
   note
    })
})
//create middleware
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

// export the app
module.exports = app;
