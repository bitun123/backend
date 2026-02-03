import React, { useEffect, useState } from "react";
import { getNotes, deleteNotes, createNotes, updateNotes } from "./api/api";

function App() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [updateDescription, setupdateDescription] = useState("");
  const [notes, setnotes] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createNotes({
      title: title,
      description: description,
    });
    getNote();
  }

  async function getNote() {
    const res = await getNotes();
    setnotes(res);
  }

  useEffect(() => {
    getNote();
  }, []);

  async function handleDeleteBtn(id) {
    const res = await deleteNotes(id);
    getNote();
  }

  async function handleUpdateBtn(id) {
    const res = await updateNotes(id, {
      description: updateDescription,
    });
    getNote();
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h1>create note</h1>
        <div className="input-form">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <button>Submit</button>
        </div>
      </form>
      <div className="update">
<h1>
  update the description
</h1>
     <input
        className="updateInput"
        type="text"
        placeholder="update description"
        value={updateDescription}
        onChange={(e) => {
          setupdateDescription(e.target.value);
        }}
      />
      </div>
 
      <div className="home">
        {notes.map((note) => {
          return (
            <div className="card">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="cardbtn">
                <button
                  onClick={() => {
                    handleDeleteBtn(note._id);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    handleUpdateBtn(note._id);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
