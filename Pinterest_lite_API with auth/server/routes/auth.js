var jwt = require('jwt-simple');

var db = require('mysql');
var connection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'NS73ur29'
});

connection.query('USE Pinterest_lite', function (err) {
    if (err) throw err;
});

var auth = {

    login: function (req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        var myQry = connection.query('Select * FROM User WHERE Email= ?', [username], function (err, result) {
            if (err) {
                console.log(err.code);
                console.log(err.fatal);
                throw err;
            }
            else {
                if (result.length > 0 && result[0].Password === password) {
                    console.log(genToken(result[0].UserID));
                    res.json(genToken(result[0].UserID));
                }
                else {
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid credentials"
                    });
                }
            }
        });



    },


    validateUser: function (username, callback) {
        var myQry = connection.query('Select * FROM User WHERE UserID= ?', [username], function (err, res) {
            if (err) {
                if (
                    res.status(403)){
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });

                }
                else {
                    // No user with this name exists, respond back with a 401
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid User"
                    });

                    console.log(err.code);
                    console.log(err.fatal);
                    throw err;
                }
            }
            else {

                console.log(res);
                if (res.length > 0) {
                    callback();
                }

            }
        });
    }
};

// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
};

module.exports = auth;
