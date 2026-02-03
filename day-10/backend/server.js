require("dotenv").config()
//import the app
const server = require("./src/app");
//import database
const connectToDb = require("./src/config/database");


//call the database 
connectToDb()



// defined the port 
server.listen(3000,()=>{
    console.log("server is running on port 3000")
})