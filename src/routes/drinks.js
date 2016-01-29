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
  if (!order.pizzas) return res.redirect('menu');
  getAllDrink()
  .then(r => {
    res.render('menuDrinks', { drink: r });
  })
});

router.post('/drinks', (req, res, next) => {
  console.log(req.body);
  let menu = req.body;
  if (!menu) return res.redirect('menu');
  if (!menu.id) return res.redirect('menu');

  let pizzas = [];
  menu.name.forEach((e, i) => {
    pizzas.push({
      name: req.body.name[i],
      id: req.body.id[i],
      price: req.body.price[i],
      quantity: req.body.quantity[i]
    });
  })

  let order = req.session.order = {};
  order.pizzas = pizzas;
  return res.redirect('drinks');
});

module.exports = router;
