//Route to pull existing scraped articles first time(root path).
//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

//get route to root(first page) - index.handlebars with current articles
router.get("/", function(req,res)  {
    db.Article.find({})
    .then(articles => res.render("index", {articles}))
    .catch(err => res.json(err));
})

module.exports = router;