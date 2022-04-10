import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import NotesSection from '../Components/notes/NotesSection';
import NoteContext from '../Context/Notes/NoteContext';

export default function Home() {

    const context = useContext(NoteContext)
    const {createNote} = context
    let history = useHistory();
    const [note, setNote] = useState({title: "", desc: "", tag: ""})

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        createNote(note)
        setNote({title: "", desc: "", tag: ""})
    }

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            history.push("/signin")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <h2>Add a note</h2>
        <br/>
        <form id="add-note-form" onSubmit={handleSubmit}>
            <label> Title : </label>
            <input type="text" name="title" placeholder="Enter title" value={note.title} onChange={handleChange} required/>
            <br/><br/>
            <label> Tag : </label>
            <input type="text" name="tag" placeholder="Enter a tag" value={note.tag} onChange={handleChange} required/>
            <br/><br/>
            <label htmlFor="desc"> Description : </label>
            <br/><br/>
            <textarea name="desc" cols="50" rows="5" value={note.desc} onChange={handleChange} required></textarea>
            <br/><br/>
            <button type="submit" className="btn-blue">Submit</button>
        </form>
        <br/><br/>
        <h2>Your notes</h2>
        <br/>
        <NotesSection/>
        </>
    )
}
