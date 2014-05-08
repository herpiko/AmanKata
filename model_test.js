var model = require('./model');

console.log("Connecting to database");

console.log("Database connected, testing started");

model.getUser('x5', function(user) {
    user.certificate.certificate.public_RSA.n = "sempak";
    user.certificate.certificate.public_DHE.y = "sempak";
    user.user_id = "sempak_1";
    console.log(user);
    model.checkUserUniqueness(user, function(result){
        console.log(result);
    });

});


return;
// TEST 1: Add new user
var new_user = {"user_id": "initrunlevel0", "password": "this should be hashed", "certificate": "no idea"};
model.registerUser(new_user, function() {
    console.log("TEST1: Data addition success, YES");
    // TEST 2: Get the user data
    model.getUser("initrunlevel0", function(data) {
        console.log("TEST2: " + JSON.stringify(data) + ", YES");
    }, function () {
        console.log("TEST2: Data get failed, NO!");
    })

    // TEST 3: Check if user password is wrong
    model.checkUser({'user_id': 'initrunlevel0', 'password': 'wrong'}, function(result) {
        if(result == true) {
            console.log("TEST3: Login Success, NO!");
        } else {
            console.log("TEST3: Login Failed, YES!");
        }
    })

    // TEST 4: Check if user password is not wrong
    model.checkUser({'user_id': 'initrunlevel0', 'password': 'this should be hashed'}, function(result) {
        if(result == true) {
            console.log("TEST4: Login Success, YES!");
        } else {
            console.log("TEST4: Login Failed, NO!");
        }
    });
    return;
}, function () {
    console.log("TEST1: Data addition failed, NO");
});

