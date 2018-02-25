var express = require('express');
var router = express.Router();
var userModel = require('../user');
var flashcardModel = require('../flashcard');
var io = require('../io');

/* GET users listing. */
router.get('/', function(req, res){
  //gyul just do something pretty
});

router.get('/login', function(req, res){
  userModel.findOne({ email: req.body.email, password: req.body.password}, function(err, user) {
    if (!user) {
      res.render('adminAuth', { error: 'Invalid email or password.' });
    } else {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;
        res.redirect('/admin');
    }
  });
});

router.get('/signup', function(req, res){
  var newUser = new userModel({
    email: req.body.email,
    password: req.body.password,
    cards: new Array()
  });
  newUser.save(function(err, user){
    if(err) return console.error(err);
    res.redirect('/admin');
  });
});
module.exports = router;
