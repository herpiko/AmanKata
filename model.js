var mongoose = require('mongoose');
var async = require('async');
var database_server = 'mongodb://localhost/test'; // It actually dynamic depends on where the server is (in case you host it with OpenShift)
mongoose.connect(database_server);

// State of the art
module.exports.is_connected = false;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
    module.exports.is_connected = true;
    var userSchema = new mongoose.Schema({
        user_id: String,
        password: String,
        certificate: {
            certificate: {
                user_id: String,
                public_RSA: {
                    e: String,
                    n: String
                }
            },
            sign: String
        }
    });
    var User = mongoose.model('User',userSchema);

    module.exports.registerUser = function(data, fn, fn_error) {
        var user = new User({
            user_id: data['user_id'],
            password: data['password'],
            certificate: data['certificate']
        });

        // Check if user is actually exist
        module.exports.getUser(data['user_id'], function() {
            // The user exist, return error
            fn_error();
        }, function() {
            // The user doesn't exist, add it to database
            user.save(function (err, user) {
                if (err) fn_error();
                else fn();
            });
        })
    };

    module.exports.checkUser = function(data, fn) {
        User.findOne({'user_id': data['user_id'], 'password': data['password']}, function(err, User) {
            if (err) fn(false);
            else {
                if(User != null) fn(true);
                else fn(false);
            };
        });
    };

    module.exports.getUser = function(user_id, fn, fn_error) {
        User.findOne( {'user_id' : user_id}, function (err, User) {
            if (err) fn_error();
            else {
                if(User == null) fn_error();
                else fn(User);
            };
        });
    };

    module.exports.checkUsersList = function(users_list, fn) {
        var result = true;
        var function_list = [];
        for (i in users_list) {
            function_list.push(function(callback) {
                User.findOne( {'user_id': users_list[i]}, function (err, User) {
                    if (err)
                        callback(null, false);
                    else {
                        if (User == null) callback(null, false);
                        else callback(null, true);
                    }
                });
            });
        }
        async.parallel(function_list, function(err, results){
            for (i in results) {
                if (results[i]== false){
                    fn(false);
                    return;
                }
            }
            fn(true);
        });
    }
//});
