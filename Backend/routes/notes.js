const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');    

// Routes: 1 :Get all the data
router.get('/notes/fetchalldata', fetchuser, async (req, res) => {

    try {
        const fetch_notes = await Note.find({ user: req.user.id })
        res.json(fetch_notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

// Router 2 : Post the notes 
router.post('/notes/postdata', fetchuser, [
    body('title', 'Enter a valid title!!').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description } = req.body;
        //If there are error, return Bad Req and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, user: req.user.id
        })
        const savenotes = await note.save()
        res.json(savenotes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})


//Route 3 : Update the existing notes by using PUT req , we can also use POST req but for updation purpose we use PUT
router.put('/notes/updatedata/:id', fetchuser, async (req, res) =>{
    const {title , description} = req.body ; 
    try {
        
   
    // Create a new note for updation
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};

    //Find the note which is going to update
    let note = await Note.findById(req.params.id)    // req.params.id takes dynamic input from the URL path
    if(!note){return res.status(404).send("Not found")}     // the given id note is not found

    if(note.user.toString() != req.user.id){                   //bhul ache
        return res.status(401).send("Not allowed")  //check log in user = update user
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new : true})
    res.json({note});
}  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
}
})

// Route 4 : delete the note 

router.delete('/notes/deletedata/:id', fetchuser, async(req, res) =>{
    const {title , description} = req.body ; 
    try {
        
    
    //Find the note which is going to update
    let note = await Note.findById(req.params.id)    // req.params.id takes dynamic input from the URL path
    if(!note){return res.status(404).send("Not found")}     // the given id note is not found

    if(note.user.toString() != req.user.id){                   //bhul ache
        return res.status(401).send("Not allowed")  //check log in user = update user
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "The note has been deleted",note : note});
}  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
}
})


module.exports = router