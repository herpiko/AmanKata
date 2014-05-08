var mongoose = require('mongoose');
var async = require('async');
var mongodb_host = process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1';
var mongodb_port = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;

if(mongodb_host != '127.0.0.1') {
    var database_server = 'mongodb://admin:74Sx8mE9t6CC@' + mongodb_host + ':' + mongodb_port + '/amankata'; // It actually dynamic depends on where the server is (in case you host it with OpenShift)
} else {
    var database_server = 'mongodb://localhost/test';
}
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
                },
                public_DHE: {
                    y: String,
                    q: String
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

    module.exports.getUsers = function(users_list, fn) {
        users_list_formatted = [];
        for (i in users_list) {
            users_list_formatted.push({'user_id':users_list[i]});
        }
        var query_where = { $or: users_list_formatted };
        User.find( query_where, function (err, users) {
            fn(users);
        });
    };

    module.exports.checkUsersList = function(users_list, fn) {
        users_list_formatted = [];
        for (i in users_list) {
            users_list_formatted.push({'user_id':users_list[i]});
        }
        var query_where = { $or: users_list_formatted };
        User.find( query_where, function (err, users) {
            if (users.length == users_list.length)
                fn(true);
            else
                fn(false);
            /*users.count(function(err, count){
                console.log("Total matches "+count);
            });*/
        });
    }
//});
