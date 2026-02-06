const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
 name : "string",
 email : {
    type :  "string",
    unique : [true, "form this mail id is already exits"]
 },
 password : "string"
})

const authModel = mongoose.model("authData",authSchema);

module.exports = authModel;

