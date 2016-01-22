const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../../creds');
const Promise = require('bluebird')
const ad = require('../../adapter');
const Adapter = new ad();
const debug = require('debug')('staff/pizza');

router.get('/pizza', (req, res, next) => {
  const id = req.query.id;
  Adapter.getPizza(id, (e, r) => {
    res.render('staff/pizza', { results: r });
  })
});

router.post('/pizza', (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const ingredients = req.body.ingredients;
  Adapter.editPizza(id, name, price, ingredients, (e, r) => {
    res.redirect('pizza?id=' + id);
  })
});

router.get('/deletepizza', (req, res, next) => {
  const id = req.query.id;
  Adapter.deletePizza(id, (e, r) => {
    res.redirect('staff/pizzas');
  })
});

module.exports = router;
