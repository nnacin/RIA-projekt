const express = require('express');
const router = express.Router();
const request = require('request');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const getAllDrink = Promise.promisify(Adapter.getAllDrink);
const debug = require('debug')('pizzamins:menuDrinks');


router.get('/drinks', (req, res, next) => {
  let drinks = [];
  let order = req.session.order;
  if (!order) return res.redirect('menu');
  if (!order.pizzas) return res.redirect('menu');
  let total = order.total;
  getAllDrink()
  .then(r => {
    res.render('menuDrinks', { drink: r, session: drinks, total: total });
  })
});

router.post('/drinks', (req, res, next) => {
  let menu = req.body;
  if (!menu) return res.redirect('menu');
  if (!menu.id) return res.redirect('menu');

  let pizzas = [];
  let total = 0;
  if (!Array.isArray(req.body.id)) {
    pizzas.push({
      name: req.body.name,
      id: req.body.id,
      price: req.body.price,
      quantity: req.body.quantity
    });
    total = req.body.price * req.body.quantity;
  } else {
    menu.name.forEach((e, i) => {
      pizzas.push({
        name: req.body.name[i],
        id: req.body.id[i],
        price: req.body.price[i],
        quantity: req.body.quantity[i]
      });
      total += req.body.price[i] * req.body.quantity[i];
    })
  }

  let order = req.session.order = {};
  order.pizzas = pizzas;
  order.total = total;
  return res.redirect('drinks');
});

module.exports = router;
