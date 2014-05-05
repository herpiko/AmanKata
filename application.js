/* application.js: AmanKata Node.js Express Edition
 * Dibuat atas dasar kegalauan oleh manusia.
 */

/* Path to verinice */
var verinice_path = "http://localhost:9999"

var http = require('http');
var express = require('express');
var app = express();
var model = require('./model');

// EXPRESS SETTING
app.configure(function() {
    app.set('views', __dirname + '/templates');
    app.set('view engine', 'ejs');
    app.use('/static', express.static(__dirname + "/static"));
    app.use(express.bodyParser());
});

var server = app.listen(5000);
var io = require('socket.io').listen(server);
var io_client = require('socket.io-client');

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

var initializeUser = function(user_id, socket) {
	user_of_socket[socket] = user_id;
	users[user_id] = {};
	users[user_id]["socket"] = socket;
	users[user_id]["groups"] = [];
}

var checkUserValid = function(user_id, fn, fn_error) {
	model.getUser(data, function(result) {
            fn();
        }, function(result){
        	fn(false);
        });
}

var checkValidityAllUser = function(user_list, fn) {
	for (i in user_list) {
		var user = user_list[i];
		model.getUser(user, function(result) {

		}, function() {
			fn(false);
			return;
		});
	}
	fn(true);
	return;

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
		var unsigned_cert = data["user_certificate"];

        // Do connection to Verinice
        var verinice_sock = io_client.connect(verinice_path,  { 'force new connection': true });
        verinice_sock.on('connect', function() {
            verinice_sock.emit("signThisCertificate", unsigned_cert, function(result) {
                // Add to database
                var new_user = {"user_id": data["user_id"], "password": data[
                "password"], "certificate": result};
                model.registerUser(new_user, function() {
                    // Return the signed one
                    fn(result);
                    verinice_sock.disconnect();
                }, function() {
                    // If error occur when adding, also return null
                    verinice_sock.disconnect();
                    fn(null);
                });
            });
        });
        verinice_sock.on('connect_failed', function() {
            // If connection to verinice occur, return callback with null
            verinice_sock.disconnect();
            fn(null);
        });
	});

	/*socket.on('doLogin', function(data, fn) {
        // Verify if the credential are correct
		//check(data["user_id"], data["password"]);

        model.checkUser(data, function(result) {
            fn(result);
        });
	});*/

    // TODO: What is doLoginChat? I can't see it in the specification -- initrunlevel0
	socket.on('doLogin', function(data, fn) {
		model.checkUser(data, function(result) {
			if (result) {
				var user_id = data.user_id;
				initializeUser(user_id, socket);
			}
			fn(result);
        });
	});

	socket.on('requestGroupSession', function(fn) {
		var user = user_of_socket[socket];
		var user_group = [];
		for (group_id in users[user]["groups"]){
			var group = users[user]["groups"][group_id];
			user_group.push(group);
		}
		/*user_group = [
			{'group_id':1212124,'group_host_user_id':'ihe','group_guest_user_id':['haidar','ali','wira']},
			{'group_id':1343444,'group_host_user_id':'ihe','group_guest_user_id':['haidar','ali','wira']}
		];*/
		fn(user_group);
	});

	socket.on('newGroup', function(data, fn) {

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

    socket.on('requestCertificate', function(data, fn) {
        model.getUser(data, function(result) {
            fn(result["certificate"]);
        }, function() {
            fn(null);
        });
    });

    socket.on('tellLogin', function(data) {
        // TODO: emit "tellLoginClient" to every user of this group_id beside himself
    });

	socket.on('sendChat', function(data) {
		users[data['to_id']]['socket'].emit('retrieveChatClient',data);
	});

	socket.on('disconnect', function() {
	});

});
