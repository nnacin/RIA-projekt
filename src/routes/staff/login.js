var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', function(req, res) {
    res.render('staff/login');
});
    
router.post('/login', passport.authenticate('local-login',  {
        successRedirect : '/staff/orders', // redirect to the secure profile section
        failureRedirect : '/staff/login' // redirect back to the signup page if there is an error
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/staff/logout');
});

module.exports = router;