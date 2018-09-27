// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

//Create the Note schema
var NoteSchema = new Schema({
  //Comments Author
  title:{
    type: String
  },
  //Comments Text
  body: {
    type: String
  }
});

// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
