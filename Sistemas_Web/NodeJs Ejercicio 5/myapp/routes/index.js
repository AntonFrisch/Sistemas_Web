const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenido a mi página web exprés' });
});

module.exports = router;