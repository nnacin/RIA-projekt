const express = require('express');
const router = express.Router();
const Promise = require('bluebird')
const moment = require('moment');
const debug = require('debug')('pizzamins:dispatch');

router.get('/dispatch', isLoggedIn, (req, res, next) => {
  const adapter = req.app.get('adapter');
  const getUser = Promise.promisify(adapter.getUser);
  const getAllLocation = Promise.promisify(adapter.getAllLocation);

  let id = req.user._id;
  let order = req.session.order;
  if (!order) return res.redirect('menu');
  if (!order.pizzas) return res.redirect('menu');
  getAllLocation()
  .then(loc => {
    getUser(id)
    .then(user => {
      res.render('dispatch', { user: user, order: order, location: loc });
    })
  })
});

router.post('/dispatch', isLoggedIn, (req, res, next) => {
  const adapter = req.app.get('adapter');
  const getAllLocation = Promise.promisify(adapter.getAllLocation);
  const addOrder = Promise.promisify(adapter.addOrder);
  console.log(req.body);
  console.log(req.body.dateFinished);

  getAllLocation()
  .then(loc => {
    let order = req.session.order;
    if (!order) return res.redirect('menu');
    if (!order.pizzas) return res.redirect('menu');

    order.user = req.user._id;
    order.items = [];
    order.items.push(order.pizzas);
    order.items.push(order.drinks);
    order.location = req.body.location || loc[0]._id;
    order.dateFinished = req.body.dateFinished;

    let address = req.body.address;
    let city = req.body.city;
    let zipCode = req.body.address
    if (address && city && zipCode) {
      order.deliveryLocation = {
        address: address,
        city: city,
        zipCode: zipCode
      }
    }
    addOrder(order)
    .then(r => {
      console.log(order);
      console.log(r);
      order = {};
      res.redirect('/');
    })
  });
})

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;
