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

// GLOBAL VARIABLE
var users = {}
var chats = {}
var partner = {}

// DATA VARIABLE MANAGEMENT
var addUser = function(userName) {
    users[userName] = {};
};

var removeUser = function(socket) {
	var partners;
	for (var username in users) {
		if (users[username]["socket"] == socket) {
			partners = partner[username];
			delete users[username];
			delete partner[username];
			delete chats[username];
			return partners;
		}	
	}
};

var setSocketUser = function(userName, socket) {
	users[userName]['socket'] = socket;
};

var isUserExist = function(username) {
	return (username in users); 
};

var addChat = function(username1,username2) {
	if (username1 in chats) {
		if (username2 in chats[username1])
			return false;
	}

	if (username2 in chats) {
		if (username1 in chats[username2])
			return false;
	}
	
	chats[username1] = {}
	chats[username1][username2] = {}
	partner[username1] = username2;
	partner[username2] = username1; 
	return true;	
};


// ROUTING
app.get('/', function(req, res) {
   res.render('index.ejs');
});

app.post('/chat', function(req, res) {
    console.log(req.body);
	var your_username = req.body.your_username;
	var partner_username = req.body.partner_username;
	if (isUserExist(your_username))
		res.redirect(301,'/');
	else {
		addUser(your_username);
		res.render('chat.ejs', {"your_username": your_username, "partner_username": partner_username});			
	}
});

// SOCKETIO
io.sockets.on('connection', function(socket) {
	socket.emit('balasConnectTrigger');
	socket.on('balasConnect', function(data) {
		setSocketUser(data["your_username"], socket);
		if (!addChat(data["your_username"], data["partner_username"])){
			var p = 46219;
			var q = 46451;
			var seed = [0, 0];
			for (var i=0;i<2;i++){
				while (seed[i] in [0, 1, p, q, p * q])
					seed[i] = Math.floor((Math.random()*Math.pow(2,31)+2));
			}
			socket.emit("chatStart", {"send_seed": seed[0], "recv_seed": seed[1]})
			users[data['partner_username']]['socket'].emit("chatStart", {"send_seed": seed[1], "recv_seed": seed[0]});	
		}
	});
	socket.on('sendChatMessage', function(data) {
		users[data['destination_username']]['socket'].emit('receiveMessage',{'message':data['message']});
	});
	socket.on('disconnect', function() {
		var partners = removeUser(socket);
		if (partner[partners]) {
			users[partners]['socket'].emit('disconnectUser');
			removeUser(partners);
		}
	}) ;
	
});

