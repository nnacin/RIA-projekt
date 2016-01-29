const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const getAllDrink = Promise.promisify(Adapter.getAllDrink);
const debug = require('debug')('pizzamins:menuDrinks');


router.get('/drinks', (req, res, next) => {
  let order = req.session.order;
  if (!order) return res.redirect('menu');
  if (!menu.pizzas) return res.redirect('menu');
  getAllDrink()
  .then(r => {
    res.render('menuDrinks', { drink: r });
  })
});

router.post('/drinks', (req, res, next) => {
  let menu = req.body;
  if (!menu) return res.redirect('menu');
  if (!menu.pizzas) return res.redirect('menu');

  let order = req.session.order;
  if (!order) req.session.order = {};
  order.pizzas = menu.pizzas;
  debug(`req.session ${req.session.order}`)
  debug(`order ${order}`)
  return res.redirect(drinks);
});

module.exports = router;
