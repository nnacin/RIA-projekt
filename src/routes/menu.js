const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const debug = require('debug')('menu');

/* GET users listing. */
router.get('/menu', (req, res, next) => {
  getAllPizza()
  .then(r => {
    res.render('menu', { pizza: r });
  })
});

module.exports = router;
