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
function gene

// GLOBAL VARIABLE
var user_of_socket = {}
var users = {}
var groups = {}

// ROUTING
app.get('/', function(req, res) {
   res.render('index.ejs');
});

app.post('/chat', function(req, res) {
    console.log(req.body);
	var your_username = req.body.your_username;
	var partner_username = req.body.partner_username;
	if (isUserExist(your_username)||(partner_username in partner && partner[partner_username] != your_username ) || partnerExist(partner_username) )
		res.redirect(301,'/');
	else {
		addUser(your_username);
		partner[your_username] = partner_username;
		console.log('assert '+ partner_username in partner);
		res.render('chat.ejs', {"your_username": your_username, "partner_username": partner_username});			
	}
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
		var partners = removeUser(socket);
		if (partner[partners]) {
			users[partners]['socket'].emit('disconnectUser');
			removeUser(partners);
		}
	}) ;
	
});
