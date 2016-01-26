const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const debug = require('debug')('staff/index');

router.get('/changePassword', isLoggedIn, (req, res, next) => {
    res.render('changePassword');

});

router.post('/changePassword', isLoggedIn, (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  const password2 = req.body.password2;
  const data = {
      id: id,
      password: password,
      password2: password2
  }
  console.log(data);
  Adapter.editUser(data, (e, r) => {
      console.log(e);
      console.log(r);
    res.redirect('/profile?id='+id);
  })

});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


module.exports = router;