const mongoose = require("mongoose")


// create schema that is told the database which format we use to store the data 
const noteSchema = new mongoose.Schema({
    title : "string",
    description : "string"
})



// create models that told the mongodb what operation we perform 
 const noteModel = mongoose.model("notes",noteSchema)
 module.exports = noteModel