//server create
//server config

const express = require("express");

//use meddileware

const app = express();
// app.get('/',(req,res)=>{
//     res.send("hello world")
// })
app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.send("notes created");
});


app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    
   delete notes[req.params.index] ;

res.send("notes deleted sucessfully")
})



app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("notes updated sucessfully")
})
module.exports = app;
