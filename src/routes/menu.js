const express = require('express');
const router = express.Router();
const debug = require('debug')('menu');

router.get('/menu', (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let pizzas = [];
  let order = req.session.order;
  if (order)
    if (order.pizzas)
      pizzas = order.pizzas;
  Adapter.getAllPizza((e, r) => {
    res.render('menu', { pizza: r, session: pizzas });
  })
});

module.exports = router;
