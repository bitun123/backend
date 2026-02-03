import React, { useState, useEffect } from "react";
import { receiveData, updateDes } from "../src/api/api";
function App() {
  const [des, setdes] = useState("");
  const [notes, setnotes] = useState([]);

  const getData = async () => {
    const data = await receiveData();
    console.log(data.note);
    setnotes(data.note);
  };

  useEffect(() => {
    getData();
  }, []);

  async function handleUpdateNote(noteId) {
    await updateDes(noteId, {
      description: des,
    });
    getData();
  }

  return (
    <>
      <input
        type="text"
        value={des}
        onChange={(e) => {
          setdes(e.target.value);
        }}
      />
      {notes.map((note, id) => {
        return (
          <div className="card" key={id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button
              onClick={() => {
                handleUpdateNote(note._id);
              }}
            >
              update description
            </button>
          </div>
        );
      })}
      {/* <AddNote getData={getData} /> */}
    </>
  );
}

export default App;
