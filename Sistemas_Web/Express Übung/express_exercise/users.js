var express = require('express');
var router = express.Router();
var users = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users.admin);
});

function register(user, pass1, pass2, callback){
  if(users[user] || pass1 != pass2){
    return callback(new Error("Ja fuck oida"));
  }else{
    users[user] = pass1;
    console.log(users.admin);
    console.log(users[user]);
    if (callback) {
        callback();
    };
  };
}

module.exports = {users, register};
