const express = require('express');
const router = express.Router();
const request = require('request');
const creds = require('../../creds');
const debug = require('debug')('index');

/* GET users listing. */
router.get('/', function(req, res, next) {

    const url = creds.api_url + 'users';
    console.log('url:' + url);
    //console.log('json:' +json);
    request.get(url, creds.api_autohorization, (e, r, body) => {

      if (e) {
        return next(e);
      }
      res.render('../views/users', {results:JSON.parse(body) })

    });
});

module.exports = router;
