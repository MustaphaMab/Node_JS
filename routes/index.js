var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn) {
    //user connecté
    res.render('index', {loggedIn: true, email: req.session.email});


  } else {

    //user non connecté
    res.render('index', { loggedIn: false, email:''});
  }

  }  
);
module.exports = router;
