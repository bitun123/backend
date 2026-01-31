const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

//  resource create using post method and status code is 201
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "data store successfully",
  });
});
// read the data using get method and status code is 200

app.get("/notes",(req,res)=>{
    res.status(200).json(notes)
})


// delete the resource using delete method and status code is 204


app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.status(204).json({
        "message":"resource delete successfully"
    })

})


//when you delete particuler index using patch method and status code is  200

app.put("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    notes[req.params.index].title = req.body.title

res.status(200).json({
     "message":"modify successfully"
})
})







module.exports = app;
