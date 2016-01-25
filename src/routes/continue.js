const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const getAllDrink = Promise.promisify(Adapter.getAllDrink);
const debug = require('debug')('staff/index');

/* GET users listing. */
router.post('/continue', isLoggedIn , function (req, res)  {
  res.render('location');
});




function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;