/* application.js: AmanKata Node.js Express Edition
 * Dibuat atas dasar kegalauan oleh manusia.
 */

/* Path to verinice */
var verinice_path = "http://localhost:9999"

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

// HELPER FUNCTION
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateGroupKey = function() {
	var new_group_key = getRandomInt(1000000,9999999);
	while (new_group_key in groups)
	{
		new_group_key = getRandomInt(1000000,9999999);
	}
	return new_group_key;
}

function checkUserValid(user) {
	return (user in users);
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
		var unsigned_cert = data["new_user_certificate"];

        // Do connection to Verinice
        var verinice_sock = io.connect(verinice_path);
        verinice_sock.on('connect', function() {
            verinice_sock.emit("signThisCertificate", unsigned_cert, function(result) {
                // Add to database
                // TODO: Model belum ada

                // Return the signed one to callback
                fn(result);
            });
        });
        verinice_sock.on('connect_failed', function() {
            // Return null to callback
            fn(null);
        });
	});

	socket.on('doLogin', function(data, fn) {
        // Verify if the credential are correct
        // TODO: STUB
		//check(data["user_id"], data["password"]);
		fn(true);
	});

    // TODO: What is doLoginChat? I can't see it in the specification -- initrunlevel0
	socket.on('doLoginChat', function(data, fn) {
		//check(data["user_id"], data["password"]);
		var user_id = data.user_id;
		user_of_socket[socket] = user_id;
		users[user_id] = {};
		users[user_id]["socket"] = socket;
		users[user_id]["groups"] = []; // Why we have to track group of each user here? -- initrunlevel0
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

	socket.on('newGroup', function(data, fn) {
		boolean invalid_user = false;
		for (user_id in data["group_guest_user_id"]) {
			var user = data["group_guest_user_id"][user_id];
			if (!checkUserValid(user))
			{
				invalid_user = true;
				break;
			}
		}
		if (invalid_user)
		{
			fn(false);
			return;
		}
		var new_group = data;
		var group_id = generateGroupKey();
		new_group["group_id"] = group_id;
		groups[group_id] = new_group;
		users[data["group_host_user_id"]]["groups"].push(group_id);
		for (user_id in data["group_guest_user_id"]) {
			var user = data["group_guest_user_id"][user_id];
			users[user].push(group_id);
		}
		fn(true);
	});

	socket.on('sendChat', function(data) {
		users[data['to_id']]['socket'].emit('retrieveChatClient',data);
	});

	socket.on('disconnect', function() {
	});

});
