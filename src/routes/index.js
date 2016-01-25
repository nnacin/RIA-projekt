const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const debug = require('debug')('index');

router.get('/' , function (req, res)  {
  res.render('index');
});

module.exports = router;
