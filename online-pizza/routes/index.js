var express = require('express');
var router = express.Router();
var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment-timezone');
var async = require('async');


// routes/users.js
module.exports = function (passport) {


  // process the login form
  router.post('/',
    passport.authenticate('local-login', {
      //successRedirect : '/', // redirect to the secure profile section -> off so callback is called
      failureRedirect: '/', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    function (req, res) {
      res.redirect('http://www.9gag.com');
    });

  // return router instance
  return router;
};