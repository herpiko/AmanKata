var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	var userSchema = mongoose.Schema({
		user_id: String,
		password: String,
		certificate: String
	});
	var User = mongoose.model('User',userSchema);
	
	module.exports.registerUser = function(data, fn) {
		var user = new User({ 
			user_id: data['user_id'],
			password: data['password'],
			certificate: data['certificate'] 
		});
		user.save(function (err, user) {
			if (err) return console.error(err);
		});
	};
	
	module.exports.checkUser = function(data, fn) {
	};
	module.exports.getUser = function(user_id, fn) {
		User.findOne( {'user_id' : user_id}, function (err, User) {
			if (err) return console.log(err);
		});
		fn(User);
	};
});