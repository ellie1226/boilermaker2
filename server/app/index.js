// Basic Server Routes
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('../db/db.js');
const passport = require('passport');

// this means that we need to make sure our local NODE_ENV variable is in fact set to 'development'
// Node may have actually done this for you when you installed it! If not though, be sure to do that.
if (process.env.NODE_ENV === 'development') {
    require('../auth/secrets'); // this will mutate the process.env object with your secrets.
  }
// require('../auth/secrets'); // mutate the process.env object with your variables
// require('./mainApp')       // run your app after you're sure the env variables are set.

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

//Assuming we'll attach the session middleware to our app (but we could also be attaching it to a router that our app uses.
//by default session info will be stored in memory for life of your server process
//Then, on our deployment server, we can set an environment variable called SESSION_SECRET with our real secret!
// plug the store into our session middleware

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use("/passport", require("./passport")); ???
// app.use("/auth", require("../auth")); ??

// need body parser if you want to use re.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for having server logs, great for debugging
app.use(morgan('dev'));

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../../public')))

app.use('/api', require('../api/index')); // matches all requests to /api


// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});


 //make sure its at the very end of your entry file
  //catching server related errors 500 and log them out
  app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  })






//Note that if you want to give more informational messages about valid frontend routes vs routes that are invalid change up your

// app.get('*', function (req, res, next) {
//     res.sendFile(path.join(__dirname, './path/to/your/index.html'));
//   });</


module.exports = app;