const express = require('express');
const router = express.Router();
const request = require('request');
const debug = require('debug')('index');

router.get('/' , function (req, res)  {
  res.render('index');
});

module.exports = router;
