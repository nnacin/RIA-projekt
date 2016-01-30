const express = require('express');
const router = express.Router();
const debug = require('debug')('pizzamins:continue');

router.get('/continue', isLoggedIn, (req, res, next) => {
  res.redirect('dispatch');
})

router.post('/continue', (req, res, next) => {
  let menu = req.body;
  if (!menu) return res.redirect('menu');
  if (!menu.id) return res.redirect('menu');

  let drinks = [];
  let order = req.session.order;
  let total = order.total;
  if (!Array.isArray(req.body.id)) {
    drinks.push({
      name: req.body.name,
      id: req.body.id,
      price: req.body.price,
      quantity: req.body.quantity
    });
    total += req.body.price * req.body.quantity;
  } else {
    menu.name.forEach((e, i) => {
      drinks.push({
        name: req.body.name[i],
        id: req.body.id[i],
        price: req.body.price[i],
        quantity: req.body.quantity[i]
      });
      total += req.body.price[i] * req.body.quantity[i];
    })
  }

  order.drinks = drinks;
  order.total = total;
  console.log(req.session.order);
  res.redirect('continue');
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && !req.user.active)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;
