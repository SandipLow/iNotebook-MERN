import React, { useContext, useState } from 'react'
import NoteContext from '../../Context/Notes/NoteContext'
import './style.css'

export default function Note(props) {
    const context = useContext(NoteContext);
    const {deleteNote, editNote} = context;

    const [editState, setEditState] = useState(false);
    const [note, setNote] = useState({title: props.name, description: props.desc, tag: props.tag});

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    const dele = ()=> {
        deleteNote(props.id);
    }

    const edit = ()=> {
        if (editState) {
            setEditState(false);
            editNote(props.id, note);
        }
        else {
            setEditState(true);
        }
    }

    if (editState) {

        return (
            <div className="game">
                <input className="title" name='title' value={note.title} onChange={handleChange} />
                <br/>
                <textarea name='description' value={note.description} onChange={handleChange} />
                <br/>
                <input name='tag' value={note.tag} onChange={handleChange} />
                <br/>
                <button onClick={edit}>Edit</button>
                <button onClick={dele}>Delete</button>
            </div>
        )
    }
    return (
        <>
            <div className="game">
                <h2 className="title">{props.name}</h2>
                <br/>
                <p>{props.desc}</p>
                <br/>
                <button onClick={edit}>Edit</button>
                <button onClick={dele}>Delete</button>
            </div>
        </>
    )
}
