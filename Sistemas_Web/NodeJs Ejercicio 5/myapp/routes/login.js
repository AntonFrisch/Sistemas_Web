var express = require('express');
var router = express.Router();

const users = {
  user1: 'user1',
  user2: 'user2'
};

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});



router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    req.session.user = username;
    res.redirect('/logedin');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
