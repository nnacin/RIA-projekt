const express = require('express');
const router = express.Router();
const moment = require('moment');
const Promise = require('bluebird')
const debug = require('debug')('pizzamins:profile');

router.get('/myOrders', isLoggedIn, (req, res, next) => {
  const adapter = req.app.get('adapter');
  const getUserOrder = Promise.promisify(adapter.getUserOrder);
  let id = req.user._id;
  getUserOrder(id)
  .then(orders => {
    if (!orders.length) return res.redirect('profile');
    res.render('myOrders', { orders: orders, moment : moment });
  })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() && !req.user.active)
        return next();
    res.redirect('/login');
}

module.exports = router;
