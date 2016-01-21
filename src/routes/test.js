const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird');
const debug = require('debug')('test');

router.get('/test', (req, res, next) => {
  const adapter = req.app.get('adapter');
  const getAllPizza = Promise.promisify(adapter.getAllPizza);
  getAllPizza()
  .then(r => {
    debug(r);
    res.render('test', { results: JSON.stringify(r) })
  })
});

module.exports = router;
