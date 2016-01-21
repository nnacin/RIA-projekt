const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../../creds');
const Promise = require('bluebird')
const ad = require('../../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const debug = require('debug')('staff/drinks');

/* GET users listing. */
router.get('/drinks', (req, res, next) => {
  res.render('staff/drinks');
});

module.exports = router;