import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNotes } from "../features/notes/notesSlice";

const Notes = ({ setView }) => {
  const dispatch = useDispatch();
  const savedMyNotes = useSelector((state) => state?.notes?.savedNotes);
  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState("");

  // ✅ Load from local storage on mount
  useEffect(() => {
    setNotes(savedMyNotes);
  }, [savedMyNotes]);

  // ✅ Add a new note
  const handleAddNote = (notes) => {
    if (newNote.trim()) {
      dispatch(saveNotes(notes));
      setNewNote("");
      alert("Notes saved!");
      //   setNotes((prevNotes) => [...prevNotes, newNote]);
      //   setNewNote("");
    } else {
      alert("Cannot add an empty note!");
    }
  };

  // ✅ Save notes to local storage
  const saveNotesToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };
  return (
    <div className="notes-view text-center w-full">
      <h1 className="text-xl font-bold text-gray-700">My Notes Section</h1>

      {/* 📝 List of Saved Notes */}
      <div className="mt-4 text-left">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className="p-2 border border-gray-300 rounded-md mb-2 bg-gray-100"
            >
              {note}
            </div>
          ))
        ) : (
          <p>No notes added yet.</p>
        )}
      </div>

      {/* 🆕 Add New Note */}
      <textarea
        placeholder="Write your notes here..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mt-4"
        rows="3"
      />

      {/* ✅ Add and Save Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handleAddNote(newNote)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Note
        </button>
        {/* <button
        //   onClick={saveNotesToLocalStorage}
        //   onClick={()=>dispatch(saveNotes(newNote))}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Notes
        </button> */}
      </div>

      <button
        onClick={() => setView("main")}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Go Back
      </button>
    </div>
  );
};

export default Notes;
