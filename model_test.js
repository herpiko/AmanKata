var model = require('./model');

console.log("Connecting to database");

console.log("Database connected, testing started");

var new_user = {
    user_id: "haidar",
    certificate : { 
        sign : "375D7E0B9AD52ADD1FCD353B4378F9799DDD50914FE8317FF9F63A5FE0B324F536E78820C335080859BCB7193CFDAA23C7E8660EE6AD1749DCB80466DBC2FED4ABBD9270F103B4FDFAAF6D791C71D77FE1461A3B4CA26E19DAFC8DF04ED398B8023383FEF92D72F4393542750530146F9F04922E65DDD006404905C4D4DC5C5E", 
        certificate : 
        { user_id : "haidar", public_DHE : { y : "5B713432A78ABDF08E3987C6AFCB3B7248C9171DDDAF4D85CE2239384C34FE2AFDAFE13E028BC6F5FFE4EF11FA1144A12CC3A6511F792BAE704CF7D0EFC8C1928A0B803A14769645C67A7A8BEA9E866F5E2A06271C90B966BF2D7D7507A176932FF9567F1C3A7B410750C8358026EA2696B1C0CCDED7645F4DE40D7D10700D0", q : "B037D2867723DC4F0352C2DD3AE53EF685EE197BB8BD63E11FDD32BC33FCA596B6DDCBA89B43EB09CBE1CC0F01E030A735E48FC7B166F99B8CEA2F5320806CB568826319DE68F0A8FE9EC2AEF892A2666197573EC11D794A062D9B11EA4BFD2834CFB4312299E0EE29B2CC81D0666DE5C635B730318F3FB2DF789034BC3DD063" }, 
        public_RSA: { "e" : "10001", "n" : "9B6DCC3AFBDA7D7728C463DFDED5E079A0BE47F48AB0CD6EC28FC49D54A05A4C939DCFAAC18500C4ACF45F75B65FD6254010CAA8C75E82631059599B729A9F88C16124556741535AF7465F233520302990395DC4E9E82A2E08368D5E849C16774522833671D41CA8C4C4AE5238213E40FAF4C878BBAD2B2C49D00BE9D24ABCA7" } } }, "__v" : 0 }

}

user_list = ['a','b'];
model.getUsers(user_list, function(result) {
    console.log(result);
});



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

