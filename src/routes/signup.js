var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',  {
    successRedirect : '/redirectHandler', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    session: true
}));


module.exports = router;
