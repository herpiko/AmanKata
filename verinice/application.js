/*
 * VeriNice simple Digital Certficate Authority
 *
 * Putu Wiramaswara Widya <wiramaswara11@mhs.if.its.ac.id>
 */

var rsaSignator = require("./rsaSignator.js");
var io = require('socket.io').listen(9999);

io.sockets.on('connection', function (socket) {
    // onSignThisCertificate
    socket.on("signThisCertificate", function(data, fn) {
        rsaSignator.signCertificate(data, function(result) {
            fn(result);
        });
    });

    // verifyCertificate
    socket.on("verifyCertificate", function(data, fn) {
        rsaSingator.verifyCertificate(data, function(result) {
            fn(result);
        });
    })
});
