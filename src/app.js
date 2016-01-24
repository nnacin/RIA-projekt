const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const request = require('request');
const routeLoader = require('express4-route-loader');
const Promise = require('bluebird');
const Adpt = require('./adapter');
const Adapter = new Adpt();

const app = express();

//attach adapter to app
app.set('adapter', Adapter);

app.enable('trust proxy');

// Configuring Passport
app.use(require('express-session')({
    secret: 'verySuperSecret'
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.path = {
    complete: req.path
  };
  next();
});

passport.use('local-login', new LocalStrategy({
      passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req,username, password, done) { // callback with email and password from our form
    Adapter.getEmployeeByUsername(username, (e, r) => {
      if (e)
        return done(e);

      if (r.length == 0)
        return done(null, false, {}); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!isValidPassword(r[0], password))
          return done(null, false, {}); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, r[0]);
    })
  }
));

passport.serializeUser( function(user, done) {
  done(null, user._id);
});

passport.deserializeUser( function(id, done) {
  Adapter.getEmployee(id, function(e, r) {
    done(e, r[0]);
  });
});

app.use(function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.locals.user = {
    username: req.user.username,
    email: req.user.email
    ///access level rights odnosno da li je user ili employee
  };
  return next();
});

//load all routes from ./routes
routeLoader(app, __dirname + '/routes');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var isValidPassword = function(user, password){
  return (password == user.password);
}

module.exports = app;
