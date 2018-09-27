//Routers for handling notes
//Dependencies
//Dependencies for article routes
var express = require("express");
var router = express.Router();
var db = require("../models");

//get route to retrieve all notes for a particlular article
router.get('/getNotes/:id', function (req,res){
  db.Article
    .findOne({_id: req.params.id})
    .populate('notes')
    .then(results => res.json(results))
    .catch(err => res.json(err));
});

//get route to return a particluar note to view it
router.get('/getSingleNote/:id', function (req,res) {
  db.Note
  .findOne({_id: req.params.id})
  .then( result => res.json(result))
  .catch(err => res.json(err));
});

//post route to create a new note in the database. Get note info from request and create an object
router.post('/createNote', function (req,res){
  var  { title, body, articleId } = req.body;
  var note = {
    title,
    body
  };
  db.Note
    .create(note)
    .then( result => {
      db.Article
        .findOneAndUpdate({_id: articleId}, {$push:{notes: result._id}},{new:true})//saving reference to note in corresponding article
        .then( data => res.json(result))
        .catch( err => res.json(err));
    })
    .catch(err => res.json(err));
});

//post route to delete a particluar note. Get note info from request and use the id to remove it.
router.post('/deleteNote', function(req,res){
  var {articleId, noteId} = req.body;
  db.Note
    .remove({_id: noteId})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


module.exports = router;
