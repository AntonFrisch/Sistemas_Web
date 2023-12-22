const bcrypt = require("bcrypt");

const users = {};

users.comparePass = function(pass, hash, callback){
    bcrypt.compare(pass, hash, callback);
}

users.generateHash = function(pass, callback){
    bcrypt.hash(pass, 10, callback);
}

users.register = function(username, pass, callback){
    if(users[username]){
        return callback(new Error("User already exists"));
    }
    users.generateHash(pass, function(err, hash){
        if (err){
            return callback(err);
        }
        users[username] = {username, hash};
        if (callback) {
            callback();
        };
    });
}

users.register('admin', 'admin', function(){
    console.log('User admin successfully registered');
});
users.register('user', 'user');

module.exports = users;