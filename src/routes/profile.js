const express = require('express');
const router = express.Router();
const moment = require('moment');
const Promise = require('bluebird')
const debug = require('debug')('pizzamins:profile');

router.get('/profile', isLoggedIn, (req, res, next) => {
  const adapter = req.app.get('adapter');
  const getUser = Promise.promisify(adapter.getUser);
  const getUserOrder = Promise.promisify(adapter.getUserOrder);
  let id = req.user._id;
  getUser(id)
  .then(r => {
    getUserOrder(id)
    .then(orders => {
      res.render('profile', { results: r, orders: orders, moment : moment });
    })
  })
});

router.post('/profile', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let data = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    zipCode: req.body.zipCode
  }
  Adapter.editUser(data, (e, r) => {
    res.redirect('/');
  })

});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && !req.user.active)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


module.exports = router;
