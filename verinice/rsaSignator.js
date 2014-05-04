var BigNumber = require("./bignumber")

module.exports.signCertificate = function(unsignedCertificate, callback) {
    var result = "abcdefghijklmnopqrstuvwxyz";
    // Stub
    callback(result);
};

module.exports.verifyCertificate = function(signedCertificate, callback) {
    var result = true; // Or false maybe, dear?
    callback(result);
};
