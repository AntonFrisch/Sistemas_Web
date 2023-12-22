var express = require('express');
var users = require('../users');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
  });

router.post('/', function(req, res, next){
    var user=req.body.user;
    var pass1=req.body.pass1;
    var pass2=req.body.pass2;
    if(user && pass1 === pass2){
        users.register(user, pass1, pass2, function(err){
            if(err){
                res.send("error");
                res.redirect("/register");
            }else{
                res.redirect("/login");
            }
        })
    }
    else{
        res.send("passwords dont match");
    }
});

module.exports = router;