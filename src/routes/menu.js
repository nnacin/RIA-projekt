const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const debug = require('debug')('menu');

router.get('/menu', (req, res, next) => {
  let pizzas = null;
  let order = req.session.order;
  if (order)
    if (order.pizzas)
      pizzas = order.pizzas;
  getAllPizza()
  .then(r => {
    res.render('menu', { pizza: r, session: pizzas });
  })
});

module.exports = router;
