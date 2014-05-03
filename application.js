/* application.js: AmanKata Node.js Express Edition
 * Dibuat atas dasar kegalauan oleh manusia.
 */


var http = require('http');
var express = require('express');
var app = express();

// EXPRESS SETTING
app.configure(function() {
    app.set('views', __dirname + '/templates');
    app.set('view engine', 'ejs');
    app.use('/static', express.static(__dirname + "/static"));
    app.use(express.bodyParser());
});

var server = app.listen(5000);
var io = require('socket.io').listen(server);

//HELPER
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generate_new_group_key() {
	var new_group_key = getRandomInt(1000000,9999999);
	while (new_group_key in groups)
	{
		new_group_key = getRandomInt(1000000,9999999);
	}
	return new_group_key;
}

// GLOBAL VARIABLE
var user_of_socket = {}
var users = {}
var groups = {}

// ROUTING
app.get('/', function(req, res) {
   res.render('login.ejs');
});

app.get('/login', function(req, res) {
   res.render('login.ejs');
});

app.get('/register', function(req, res) {
   res.render('register.ejs');
});

app.get('/chat', function(req, res) {
   res.render('chat.ejs');
});

// SOCKETIO
io.sockets.on('connection', function(socket) {
	socket.on('registerUser', function(data, fn) {
		var cert = data["new_user_certificate"];
		//sign
		fn(cert);
	});

	socket.on('doLogin', function(data, fn) {
		//check(data["user_id"], data["password"]);
		fn(true);
	});

	socket.on('doLoginChat', function(data, fn) {
		//check(data["user_id"], data["password"]);
		var user_id = data.user_id;
		user_of_socket[socket] = user_id;
		users[user_id] = {};
		users[user_id]["socket"] = socket;
		users[user_id]["groups"] = [];
		fn(true);
	});

	socket.on('requestGroupSession', function(fn) {
		var user = user_of_socket[socket];
		var user_group = [];
		for (group_id in users[user]["groups"]){
			var group = users[user]["groups"][group_id];
			user_group.push(group); 
		}
		user_group = [
			{'group_id':1212124,'group_host_user_id':'ihe','group_guest_user_id':['haidar','ali','wira']},
			{'group_id':1343444,'group_host_user_id':'ihe','group_guest_user_id':['haidar','ali','wira']}
		];
		fn(user_group);
	});

	socket.on('newGroup', function(data) {
		var new_group = data;
		var group_id = generate_new_group_key();
		new_group["group_id"] = group_id;
		groups[group_id] = new_group;
		users[data["group_host_user_id"]]["groups"].push(group_id);
		for (user_id in data["group_guest_user_id"]) {
			var user = data["group_guest_user_id"][user_id];
			users[user].push(group_id);
		}
	});

	socket.on('disconnect', function() {
	});

});
