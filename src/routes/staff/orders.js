const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../../creds');
const Promise = require('bluebird')
const ad = require('../../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const debug = require('debug')('staff/orders');

/* GET users listing. */
router.get('/orders', (req, res, next) => {
  res.render('staff/orders');
});

module.exports = router;
