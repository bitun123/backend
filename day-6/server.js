const server = require("./src/app");
const mongoose = require("mongoose")



function connectTodb(){
    mongoose.connect("mongodb+srv://satyajitdasmahapatra2002_db_user:MGBBRwyhJPigM4Ol@backendproject0.ok4exmp.mongodb.net/day-6")
    .then(()=>{
        console.log("connect to database")
    })
}

connectTodb()

server.listen(3000,()=>{
    console.log("server is running on port 3000")
})