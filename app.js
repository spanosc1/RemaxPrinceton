var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var validator = require('express-validator');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var cloudinary = require('cloudinary');
var moment = require('moment');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var Admin = require('./models/admin');

var app = express();
//get this with: heroku config:get MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
require('./config/passport');

var hbs = expressHbs.create({
  helpers: {
    //Transforms unix time into date or how long ago the post was made
    dateStringConvert: function(time) {
      var dateString = moment.unix(time/1000).format("MM/D/YYYY");
      return dateString;
    },
    adminDateStringConvert: function(time) {
      var dateString = moment.unix(time/1000).format("MM/DD/YY");
      return dateString;
    },
    json: function(content) {
      return JSON.stringify(content);
    }
  },
  defaultLayout: 'layout',
  extname: '.hbs'
});
//view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
//User session, stored in mongo database, lasts 7 days
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//passport.use('local', new LocalStrategy(Admin.authenticate()));

cloudinary.config(
  {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  }
);
//Store the keys as locals 
app.locals.api_key = cloudinary.config().api_key;
app.locals.cloud_name = cloudinary.config().cloud_name;

app.use(function(req, res, next) {
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
});

app.use('/users', users);
app.use('/admin', admin);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
