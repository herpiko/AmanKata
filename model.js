var mongoose = require('mongoose');
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
		certificate: String
	});
	var User = mongoose.model('User',userSchema);

	module.exports.registerUser = function(data, fn, fn_error) {
		var user = new User({
			user_id: data['user_id'],
			password: data['password'],
			certificate: data['certificate']
		});
		user.save(function (err, user) {
			if (err) fn_error();
            else fn();
		});
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
		for (i in users_list) {
			(function(i) { 
				User.findOne({'user_id': users_list[i]}, function(err, User) {
					if (User = null) {
						result = false;
					}
				});
			})(i);
		}
		fn(result);
	}
//});
