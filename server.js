// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');

//initializing the app
const app = express();

// Requiring our Note and Article models
//var Note = require("./models/note.js");
//var Article = require("./models/article.js");

// Set up mongoose database.
const config = require('./config/database');
mongoose.Promise = Promise;
mongoose
  .connect(config.database)
  .then( result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`);
  })
  .catch(err => console.log('There was an error with your connection:', err));

//setting up favicon middleware
//app.use(favicon(path.join(__dirname, 'public', 'assets/img/favicon.ico')));

//setting up Morgan middleware
app.use(logger('dev'));

//setting up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setting up handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/articles',express.static(path.join(__dirname, 'public')));
app.use('/notes',express.static(path.join(__dirname, 'public')));


//Require routes files
var index = require('./routes/index');
var articles = require('./routes/articles');
var notes = require('./routes/notes');
var scrape = require('./routes/scrape');

// SSetting up routes for Articles, Notes and Scrape
app.use('/', index);
app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

//starting server and listening to Port 3000
const PORT = process.env.PORT || 3005;
app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});
