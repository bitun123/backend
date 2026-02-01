//require the app 

require("dotenv").config()
const connectToDb = require("./src/config/database")
const server = require("./src/app")

// connect to the database

connectToDb()

//run the server
server.listen(3000,()=>{
    console.log("server is running on port 3000")
})
