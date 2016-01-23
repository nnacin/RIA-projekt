var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login'); 
});
    
router.post('/login', passport.authenticate('local-login',  {
        successRedirect : '/menu', // redirect to the secure profile section
        failureRedirect : '/' // redirect back to the signup page if there is an error
    }), function(req, res) {
    console.log('Loged In as '+ req.user.username);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;