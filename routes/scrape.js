//Handles just scraping router
//Dependencies
var express = require('express');
var cheerio = require('cheerio');
var rp = require('request-promise');
var router = express.Router();
var db = require('../models');

//route to scrape new articles, save them to the database and also sends to index.handlebars- main page
router.get("/newArticles", function(req, res) {
  //configuring options object for request-promist
  const options = {
    uri: 'https://www.theverge.com/space/',
    transform: function (body) {
        return cheerio.load(body);
    }
  };
  //calling the database to return all saved articles
  db.Article
    .find({})
    .then((savedArticles) => {
      console.log("SavedArticle-Count=" + savedArticles.length);
      //creating an array of saved article headlines
      let savedHeadlines = savedArticles.map(article => article.headline);
        console.log("HeadlineArticle-Count=" + savedHeadlines.length);
        //calling request promist with options object
        rp(options)
        .then(function ($) {
          let newArticleArr = []; //Define an array of article objects
          //iterating over returned articles, and creating a newArticle object from the data
          $(".c-entry-box--compact").each(function(i, element) {
            var sUrl = $(this).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").attr("href");
            var sTitle = $(this).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").text();
            var sText = $(this).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").text();
            var iUrl  = $(this).children(".c-entry-box--compact__image-wrapper").children(".c-entry-box--compact__image").children("noscript").children("img");
            var bLine  =  $(this).children(".c-entry-box--compact__body").children(".c-byline").children(".c-byline__item").children("a").text();
               
            var newArticle = new db.Article({
 
            storyUrl: $(this).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").attr("href"),
            title: $(this).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").text(),
            storyText : $(this).children(".c-entry-box--compact__body").children(".c-entry-box--compact__title").children("a").text(),
            imageUrl  : $(this).children(".c-entry-box--compact__image-wrapper").children(".c-entry-box--compact__image").children("noscript").children("img"),
            byLine  :  $(this).children(".c-entry-box--compact__body").children(".c-byline").children(".c-byline__item").children("a").text()
            });

            console.log("Title= " + sTitle);
            console.log("Result Link= " + sUrl);
            console.log("Snip Text= " + sText );
            console.log("imageLink= " + iUrl);
            console.log("By= " + bLine);

            //checking to make sure newArticle contains a storyUrl
            if (newArticle.storyUrl) {
              //checking if new article matches any saved article, if not add it to array
              //of new articles
              if (!savedHeadlines.includes(newArticle.headline)) {
                newArticleArr.push(newArticle);
              }
            }
          });//end of each function

          //Adding all new articles to database
          db.Article
            .create(newArticleArr)
            .then(result => res.json({count: newArticleArr.length}))//returning count of new articles to front end
            .catch(err => {});
        })
        .catch(err => console.log(err)); //end of rp method
    })
    .catch(err => console.log(err)); //end of db.Article.find()
});// end of get request to /scrape

module.exports = router;
