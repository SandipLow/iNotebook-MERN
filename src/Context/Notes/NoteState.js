import { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState(props) {

  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async ()=> {
    // API Call 
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  const createNote = async (note)=> {
    const res = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({
        "title" : note.title,
        "description" : note.desc,
        "tag" : note.tag
      })
    });

    const json = await res.json();

    if (json.errors) {
      json.errors.forEach(err=> {
        alert(err.msg)
      })
    }
    else {
      getNotes();
      alert("note added successfully..!")
    }
  }

  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token')
      }
    });
    getNotes();
  }

  const editNote = async (id, note)=> {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify(note)
    });
    getNotes();
  }

  return (
      <NoteContext.Provider value={{notes, getNotes, createNote, deleteNote, editNote}}>
          {props.children}
      </NoteContext.Provider>
  )
}
