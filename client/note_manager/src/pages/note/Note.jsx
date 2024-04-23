import { useState, useEffect } from "react";

function Note() {
  const [note, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch("http://localhost:5000/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="note-container">
      <h2>Mis Notas</h2>
      <ul>
        {note.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Note;
