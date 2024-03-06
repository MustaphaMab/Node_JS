var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn) {
    res.render('index', {loggedIn: true, email: req.session.email});

  } else {
    res 
  }

  }  

module.exports = router;
