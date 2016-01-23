const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const getAllDrink = Promise.promisify(Adapter.getAllDrink);
const debug = require('debug')('menuDrinks');


router.get('/drinks', (req, res, next) => {
  getAllDrink()
  .then(r => {
    res.render('menuDdrinks', { drink: r });
  })
});

/* GET users listing. */
router.post('/drinks', (req, res, next) => {
    //var ids = req.body['id'];
    //var quantities = req.body['quantity'];
    //var pizzas = [];
    /*ids.forEach(function (id){
       pizzas.push({id: id});
    });*/

    getAllDrink()
        .then(r => {
        res.render('menuDrinks', { drink: r });
    })
});

module.exports = router;
