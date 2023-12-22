var express = require('express');
var router = express.Router();
const users = require('../users');


/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Register', user: req.session.user});
});

router.post('/', function(req, res, next){
  let username=req.body.user;
  let pass1 = req.body.pass[0];
  let pass2 =req.body.pass[1];
  if(pass1 == pass2 && pass1.length >= 8){
    users.register(username, pass1, function(err){
      if(err){
        req.session.error = "User already exists or there was a registration error";
        res.redirect("/registro");
      }else{
      req.session.user = { username: username };
      res.redirect("/restricted");
      }
    }
    )
  }else{
    req.session.error = "password bad";
    res.redirect("/registro");
  }

}
)
module.exports = router;