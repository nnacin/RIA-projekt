const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const creds = require('../../creds');
const Promise = require('bluebird');
const debug = require('debug')('test');

router.get('/test', (req, res, next) => {
  const adapter = req.app.get('adapter');
  const getAllLocation = Promise.promisify(adapter.getAllLocation);
  const deleteLocation = Promise.promisify(adapter.deleteLocation);
  const editLocation = Promise.promisify(adapter.editLocation);
  const addLocation = Promise.promisify(adapter.addLocation);
  const addUser = Promise.promisify(adapter.addUser);
  const getUser = Promise.promisify(adapter.getUser);
  const editUser = Promise.promisify(adapter.editUser);
  const getAllOrder = Promise.promisify(adapter.getAllOrder);
  const getOrder = Promise.promisify(adapter.getOrder);
  const getUserOrder = Promise.promisify(adapter.getUserOrder);
  const addOrder = Promise.promisify(adapter.addOrder);
  let data = {
    firstName:  'Ivan'
  , lastName:   'Milaković'
  , username:   'imilakoo'
  , email:      'email'
  , password:   'password'
  , password2:   'password'
  , location: '569a6cc0ea1598401e2b2965'
  , active: true
  , id: '569a86bf30e038581cbacfee'
  }
  getAllOrder()
  .then(r => {
    debug(r);
    getAllLocation()
    .then(user => {
      res.render('test', { results: JSON.stringify(user) });
    })
  })
});

module.exports = router;
