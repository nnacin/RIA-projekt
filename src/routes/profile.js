const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const debug = require('debug')('staff/index');

router.get('/profile', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.getUser(id, (e, r) => {
    res.render('profile', { results: r });
  })
});

router.post('/profile', isLoggedIn, (req, res, next) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const address = req.body.address;
  const city = req.body.city;
  const zipCode = req.body.zipCode;
  Adapter.editUser(id, firstName, lastName, phone, address, city, zipCode, (e, r) => {
    res.redirect('/');
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