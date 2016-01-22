const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../../creds');
const Promise = require('bluebird')
const ad = require('../../adapter');
const Adapter = new ad();
const debug = require('debug')('staff/drink');

router.get('/drink', (req, res, next) => {
  const id = req.query.id;
  Adapter.getDrink(id, (e, r) => {
    res.render('staff/drink', { results: r });
  })
});

router.post('/drink', (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;
  Adapter.editDrink(id, name, price, quantity, (e, r) => {
    res.redirect('drink?id=' + id);
  })
});

module.exports = router;
