import React,{useState} from 'react'

function Update() {

      const [description, setDescription] = useState("");


       const handleSubmit = async (e) => {
          e.preventDefault();
      
          const note = await createNote({
            title,
            description,
          });
          getData();
          console.log(note);
          setTitle("");
          setDescription("");
        };
    
  return (
    <div>
           <form onSubmit={handleSubmit}>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add</button>
    </form>
    </div>
  )
}

export default Update