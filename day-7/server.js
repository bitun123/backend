
// call server and database

require("dotenv").config()
const connectToDb = require("./src/config/database")
const server = require("./src/app")


connectToDb()
server.listen(3000,()=>{
    console.log("server is running on port 3000")
})


