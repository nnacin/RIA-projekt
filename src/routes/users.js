var express = require('express');
var router = express.Router();
var request = require('request');
var creds = require('../../creds');

/* GET users listing. */
router.get('/', function(req, res, next) {

    var url = creds.api_url + 'users/';
    console.log('url:' + url);
    //console.log('json:' +json);
    request.get(url, creds.api_autohorization, function (err, _res, body) {
      if (err) {
        return next(err);
      }
      res.render('../views/users', {results:JSON.parse(body) })

    });
});

module.exports = router;
