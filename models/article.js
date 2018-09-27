// Require mongoose
var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  //Article Title is a required string
  title: {
    type: String,
    required: true,
    unique: true
  },
  //Article link is a required string
  storyUrl: {
    type: String,
    required: true
  },
  //Article text Summary
  storyText:{
    type: String
  },
  //Article related image link
  imageUrl:{
    type: String
  },
  //Article by line (Author)
  byLine:{
    type: String
  },
  //Article date
  date: String,
  saved: {
    type: Boolean,
    default: false
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
