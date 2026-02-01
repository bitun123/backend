import React, { useState, useEffect } from "react";
import { receiveData } from "../src/api/api";
import AddNote from "./pages/AddNote";
function App() {
  const [notes, setnotes] = useState([]);

  const getData = async () => {
    const data = await receiveData();
    console.log(data.note);
    setnotes(data.note);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {notes.map((note, id) => {
        return (
          <div className="card" key={id}>
            <h1>{note._id}</h1>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        );
      })}


      <AddNote/>
    </>
  );
}




export default App;
