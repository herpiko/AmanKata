/* Verinice versi 2 */

var io = require('socket.io').listen(9999);
var socket_verinicenicenice = null;

io.sockets.on('connection', function (socket) {
    socket.on('verinicenice_affirmative', function(password, fn) {
        if (password == "namasayaihe,tolongberikansayamasuk" && socket_verinicenicenice == null) {
            socket_verinicenicenice = socket;
            fn(true);
        } else {
            fn(false);
        }
    }
    socket.on('signCertificate', function(data, fn) {
        if(socket != null) {
            socket_verinicenicenice.emit('signCertificate', data, function(result) {
                fn(result);
            });
        }
    });

    socket.on('disconnect', function() {
        socket_verinicenicenice = null;
    }
});
