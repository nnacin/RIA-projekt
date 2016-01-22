const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../../creds');
const Promise = require('bluebird')
const ad = require('../../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const getAllDrink = Promise.promisify(Adapter.getAllDrink);
const debug = require('debug')('staff/index');

/* GET users listing. */
/*router.get('/', isLoggedIn , function (req, res)  {
  res.render('staff/orders');
});*/



function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// drinks
router.get('/drink', (req, res, next) => {
  const id = req.query.id;
  Adapter.getDrink(id, (e, r) => {
    res.render('staff/drink', { results: r });
  })
});

router.post('/drink', (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;
  Adapter.editDrink(id, name, price, quantity, (e, r) => {
    res.redirect('drink?id=' + id);
  })
});

router.get('/drinks', (req, res, next) => {
    getAllDrink()
        .then(r => {
        res.render('staff/drinks', { drinks: r });
    });
});

router.get('/deletedrink', (req, res, next) => {
  const id = req.query.id;
  Adapter.deleteDrink(id, (e, r) => {
    res.redirect('drinks');
  })
});
//end drinks


// employees
router.get('/employees', (req, res, next) => {
  res.render('staff/employees');
});
//end employees

//login
router.get('/login', (req, res, next) => {
  res.render('staff/login');
});
//end login 

//orders
router.get('/orders', (req, res, next) => {
  res.render('staff/orders');
});
//end orders

//pizzas
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
    res.redirect('pizzas');
  })
});

router.get('/pizzas', (req, res, next) => {
    getAllPizza()
        .then(r => {
        res.render('staff/pizzas', { pizza: r });
    });
});
//end pizzas



module.exports = router;
