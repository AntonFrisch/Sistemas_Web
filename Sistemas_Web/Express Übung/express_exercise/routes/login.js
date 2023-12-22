var express = require('express');
const userModule = require('../users');
var router = express.Router();
var users = userModule.users;



/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });

  });

router.post('/', function(req, res, next){
    var user = req.body.user;
    var pass =req.body.pass;
    console.log(user[req.body.user])

    if(users[user] && pass === users[user]){
        req.session.user = user;
        res.redirect("/secret")
    }else{
        res.redirect("/login");
    }
    });

module.exports = router;
