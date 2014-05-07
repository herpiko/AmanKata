/*
 * VeriNice simple Digital Certficate Authority
 *
 * Putu Wiramaswara Widya <wiramaswara11@mhs.if.its.ac.id>
 */

var fs = require('fs');
var io = require('socket.io').listen(9999);
var jsSHA = require('jssha');
var bigint = require('../static/bigint.js');
eval(fs.readFileSync('../static/bigint.js').toString());
var d = str2bigInt('4826F563F79C67292F14BF5CFCE3630861EF1BF7D7F9F5B699F7524851C3BD6C10946AF2F5C2ABE824D807C095759A44AB1944AD279A9DCB368FA09D4E7C1D8CF4E5B175A8274D09A1FE381B78DDE59A75B8B571603D035E92FCF94ABE0C4DE105E18BF48FB42ABEA1B6A9052F3884475248439DC995619481C5DCD06E3BD201', 16, 1);
var n = str2bigInt('5E89E95A0DD227CE91F0549A0ECDBAA33676FF252077F5317DAE5B3EA2E16B82D1F30497C9A74CF5F646C1A75C163B5C9D6C88D4BB8732BAF537190D943808A656F2FFD3D46DC0C22F31AD98B2F29910F8DA223ED9C317866CAF2790BEEF0AB4B702CD1B302A567053A5CDBF29E5E4276AEE29B5AC41E1FE54EEC89040C8B213', 16, 1);

io.sockets.on('connection', function (socket) {
    socket.on('signCertificate', function(data, fn) {
        var str = JSON.stringify(data);
        var shaObj = new jsSHA(str, 'TEXT');
        var hash = shaObj.getHash('SHA-512', 'HEX').toUpperCase();
        var sign = bigInt2str(powMod(str2bigInt(hash, 16, 1), d, n), 16);
        var certificate = {
            'certificate': data,
            'sign': sign
        };
        fn(certificate);
    });
});
