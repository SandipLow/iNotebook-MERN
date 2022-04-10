import React, {useContext, useEffect } from 'react'
import Note from './Note';
import NoteContext from '../../Context/Notes/NoteContext'

export default function NotesSection() {
    
    const context = useContext(NoteContext);
    const {notes, getNotes} = context;

    useEffect(() => {
        if (localStorage.getItem('auth-token')) getNotes();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex flex-center full-width games">
            {
                notes.map((note)=>{
                    return (
                        <Note key={note._id} id={note._id} name={note.title} desc={note.description} tag={note.tag} />
                    )
                })
            }
        </div>
    )
}
