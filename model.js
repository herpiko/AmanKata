var mongoose = require('mongoose');
var database_server = 'mongodb://localhost/test'; // It actually dynamic depends on where the server is (in case you host it with OpenShift)
mongoose.connect(database_server);

// State of the art
module.exports.is_connected = false;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    module.exports.is_connected = true;
	var userSchema = mongoose.Schema({
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
            /*
             * OK Haidar, so there is two callback for this function: The one IF there is no error, and the other if it does
             */
			if (err) fn_error();
            else fn();
		});
	};

	module.exports.checkUser = function(data, fn) {
        User.findOne({'userId': data['user_id'], 'password': data['password']}, function(err, User) {
			if (err) fn(false);
            else fn(true);
        });
	};

	module.exports.getUser = function(user_id, fn, fn_error) {
		User.findOne( {'user_id' : user_id}, function (err, User) {
			if (err) fn_error();
            else fn(User);
		});
	};
});
