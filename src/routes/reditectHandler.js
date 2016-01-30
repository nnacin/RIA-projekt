const express = require('express');
const router = express.Router();
const Promise = require('bluebird')
const debug = require('debug')('redirectHandler');

router.get('/redirectHandler' , function (req, res)  {
    let order = req.session.order;
    if (order && req.isAuthenticated()) {
        if (Object.keys(order).length)
            res.redirect('dispatch');
    } else
        res.redirect('/');
});

module.exports = router;
