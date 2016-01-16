const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const Promise = require('bluebird')
const ad = require('../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const debug = require('debug')('index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let ing = ['tomato', 'bacon', 'cheeze']
  Adapter.addPizza('bacon', 50, ing, (e, r) => {
    debug(r);
    getAllPizza()
      .then(r => {
          debug(r);
      })
  })
    const url = creds.api_url + 'users';
    console.log('url:' + url);
    //console.log('json:' +json);
    request.get(url, creds.api_authorization, (e, r, body) => {

      if (e) {
        return next(e);
      }
      res.render('../views/users', {results:JSON.parse(body) })

    });
});

module.exports = router;
