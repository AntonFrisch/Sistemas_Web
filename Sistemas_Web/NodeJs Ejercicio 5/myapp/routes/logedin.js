const express = require('express');
const router = express.Router();

function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', checkAuth, (req, res) => {
  res.render('logedin', { user: req.session.user });
});

module.exports = router;
