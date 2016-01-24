var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', function(req, res) {
    res.render('login'); 
});
    
router.post('/login', passport.authenticate('local-login-user',  {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    session: true
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;