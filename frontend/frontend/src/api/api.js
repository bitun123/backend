import axios from "axios";



const API = axios.create({
    baseURL :"http://localhost:3000",
    headers:{
        "Content-Type":"application/json"
    }
})


export const createNote =async (data)=>{
    const res = await API.post("/api/notes",data)
return res.data
}


export const receiveData = async ()=>{
const res = await API.get("/api/notes");
return res.data





}


