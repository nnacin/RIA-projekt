const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../../creds');
const Promise = require('bluebird')
const ad = require('../../adapter');
const Adapter = new ad();
const getAllDrink = Promise.promisify(Adapter.getAllDrink);
const debug = require('debug')('staff/drinks');

/* GET users listing. */
router.get('/drinks', (req, res, next) => {
    getAllDrink()
        .then(r => {
        res.render('staff/drinks', { drinks: r });
    });
});

module.exports = router;
