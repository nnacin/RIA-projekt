const express = require('express');
const router = express.Router();
const request = require('request');
const debug = require('debug')('about');

router.get('/about', (req, res, next) => {
  res.render('about');
});

module.exports = router;
