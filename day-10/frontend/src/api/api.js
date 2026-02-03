import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:3000",
    headers : {
        "Content-Type" : "application/json"
    }
})


export const createNotes = async (data)=>{
    const  res = await API.post("/api/notes",data)
    return res.data
}


export const getNotes = async()=>{
    const res = await API.get("/api/notes");
    return res.data.note
}


export const deleteNotes = async(id)=>{
    const res =await API.delete(`/api/notes/${id}`);
    return res.data
}

export const updateNotes = async(id,data)=>{
    const res = API.patch(`/api/notes/${id}`,data)
    return res.data
}