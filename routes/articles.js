//Routers for Articles
//Dependencies for article routes
var express = require("express");
var router = express.Router();
var db = require("../models");

//get route to update articles- Basicaly setting the saved flag to true will result in Viw Saved articles.
router.get("/save/:id", function(req,res){
  db.Article
    .update({_id: req.params.id}, {saved: true})
    .then(function(result){
      res.redirect("/")
    })
    .catch(function(err){
      res.json(err)
    });
});

//get route to render savedArticles.handlebars. This route is controlled by Saved article button 
router.get("/viewSaved", function(req,res){
  db.Article
    .find({})
    .then(function(result){
      res.render("savedArticles", {articles:result})})
    .catch(function(err){
        res.json(err)
    });
});


//Delete route to remove an article from the database. 
router.delete("/deleteArticle/:id", function(req,res){
  db.Article
    .remove({_id: req.params.id})
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    });
});


module.exports = router;