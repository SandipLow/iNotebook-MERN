const express = require('express');
const Notes = require("../models/Notes");
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

// My web token signature...
const JWT_DATA = "sandip@low";


// ROUTE 1: get all the notes of the user using GET: "/api/notes/getallnotes" . Log in required...
router.get('/getallnotes', fetchUser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id});
    res.json(notes);
})

// ROUTE 2: add a note using POST: "/api/notes/addnote" . Log in required...
router.post('/addnote', fetchUser, [

    // Validation array
    body("title", "Title length must be >= 3").isLength({ min: 3}),
    body("description", "description length must be >= 5").isLength({ min: 5})

], async (req, res) => {
    
    // Errors in a single json...
    const errors = validationResult(req);

    // If there error return the error json...
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create note...
    const note = await Notes.create({
        user : req.user.id,
        title : req.body.title,
        description : req.body.description,
        tag : req.body.tag,
    })

    res.send(note);
})

// ROUTE 3: update a note using PUT: "/api/notes/updatenote" . Log in required...
router.put("/updatenote/:id", fetchUser, async (req, res)=>{

    // Destructuring the document...
    const {title, description, tag} = req.body;

    const newNote = {};

    if (title) {
        newNote.title = title
    }
    if (description) {
        newNote.description = description
    }
    if (tag) {
        newNote.tag = tag
    }

    // Find the note with given id...
    let note = await Notes.findById(req.params.id)

    if (!note) {
        res.status(404).send("Not Found..!");
    }

    // Check if owner or not...
    if (note.user.toString() !== req.user.id) {
        res.status(401).send("Access Denied..!");
    }

    note = await Notes.findByIdAndUpdate( req.params.id, {$set: newNote}, {new: true});
    res.json(note);
})

// ROUTE 4: Delete a note using DELETE: "/api/notes/deletenote". Log in required...
router.delete("/deletenote/:id", fetchUser, async(req, res)=>{

    // Find the note with given id...
    let note = await Notes.findById(req.params.id)

    if (!note) {
        res.status(404).send("Not Found..!");
    }

    // Check if owner or not...
    if (note.user.toString() !== req.user.id) {
        res.status(401).send("Access Denied..!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({
        "success" : "note has been deleted",
        note : note
    });
})

module.exports = router;