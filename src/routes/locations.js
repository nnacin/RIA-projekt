const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const config = require('../../config');
const debug = require('debug')('pizzamins:locations');

router.get('/locations', (req, res, next) => {
  const Adapter = req.app.get('adapter');
  const getAllLocation = Promise.promisify(Adapter.getAllLocation);
  getAllLocation()
  .then(r => {
    debug(r)
    res.render('locations', { locations: r, creds: config });
  })
});

module.exports = router;
