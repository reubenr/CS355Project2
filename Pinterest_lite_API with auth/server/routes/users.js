var db = require('mysql');
var connection = db.createConnection({
    host     : 'localhost',
    user     : '',
    password : ''
});

connection.query('USE Pinterest_lite', function (err) {
    if (err) throw err;
});

var users = {



getUsers: function (req, res) {
    var myQry = 'SELECT * FROM User';
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;

            } else {
                console.log(result[0]);
                console.log(result);
                res.json({users: result});
            }
        }
    );
},



createUser: function (req, res) {
    var Password = req.body.Password;
    var Email = req.body.Email;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    console.log(Lname);
            var post = {Email: Email, Password: Password, FName: Fname, LName: Lname};
            var myQry = connection.query('INSERT INTO User Set ?', post, function(err, result){
                if (err){
                    console.log(err.code);
                    console.log(err.fatal);
                    throw err;
                }
                console.log('inserted ' + result.affectedRows + ' rows');
                res.json(true);
            });
    console.log(myQry.sql);
},



deleteUser: function (req, res) {
    var UserID = req.query.UserID;
    if (UserID === UserID){
        var myQry = connection.query('DELETE FROM User WHERE UserID= ?', [UserID], function(err, result){
            if (err){
                console.log(err.code);
                console.log(err.fatal);
                throw err;
            }
            console.log('deleted ' + result.affectedRows + ' rows');
            res.json(true);
        });
    }
    else{
        res.json(false);
    }

    console.log(myQry.sql);
},


updateUser: function (req, res) {
    var UserID = req.body.UserID;
    var Password = req.body.Password;
    var Email = req.body.NewEmail;
    var Fname = req.body.NewFname;
    var Lname = req.body.NewLname;
    console.log(Description, UserID, PostID);
    if (UserID === UserID) {
        var myQry = connection.query('Update User Set Email, Password, FName, LName = ? WHERE UserID= ?', [Email, Password, Fname, Lname, UserID], function (err, result) {
            if (err) {
                console.log(err.code);
                console.log(err.fatal);
                throw err;
            }
            console.log('updated ' + result.affectedRows + ' rows');
            res.json(true);
        });
    }
    else {
        res.json(false);
    }

    console.log(myQry.sql);
    }
};


module.exports = users;
