var db = require('mysql');
var connection = db.createConnection({
    host     : 'localhost',
    user     : '',
    password : ''
});

connection.query('USE Pinterest_lite', function (err) {
    if (err) throw err;
});


var followers = {

getFollowees: function (req, res) {
    var FollowingUserID = req.query.FollowingUserID;

    //var myQry = 'SELECT f.UserID, u.FName, u.LName FROM Follower as f JOIN User as u On f.UserID = u.UserID WHERE f.FollowerID=' + FollowingUserID;


    var myQry = 'SELECT f.UserID, u.FName, u.LName, s.Count FROM Follower as f JOIN User as u On f.UserID = u.UserID JOIN ' +
        '(SELECT UserID, COUNT(PostID) AS Count FROM Post GROUP BY UserID) AS s ON s.UserID = f.UserID WHERE f.FollowerID=' + FollowingUserID;



    console.log(myQry);


    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;

            } else {
                console.log(result[0]);
                console.log(result);
                res.json({user: result});
            }
        }
    );
},



getNumFollowees: function (req, res) {
    var FollowingUserID = req.query.FollowingUserID;
    var myQry = 'SELECT count(f.UserID) AS count FROM Follower f WHERE f.FollowerID=' + FollowingUserID;
    console.log(myQry);


    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;

            } else {
                console.log(result[0]);
                console.log(result);
                res.json({user: result});
            }
        }
    );
},



createFollower: function (req, res) {
    var FollowedUserID = req.query.FollowedUserID;
    var FollowingUserID = req.query.FollowingUserID;
    var post = {UserID: FollowedUserID, FollowerID: FollowingUserID};
    var myQry = connection.query('INSERT INTO Follower Set ?', post, function(err, result){
        if (err){
            console.log(err.code);
            console.log(err.fatal);
            res.json(false);
        }
        else {
            console.log('inserted ' + result.affectedRows + ' rows');
            res.json(true);
        }
    });
    console.log(myQry.sql);
},



deleteFollowee: function (req, res) {
    var FollowedUserID = req.query.FollowedUserID;
    var FollowingUserID = req.query.FollowingUserID;
    var myQry = connection.query('DELETE FROM Follower WHERE UserID=? and FollowerID=?', [FollowingUserID, FollowedUserID], function (err, result) {
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
            throw err;
        }
        console.log('deleted ' + result.affectedRows + ' rows');
        res.json(true);
    });

    console.log(myQry.sql);
    }
};


module.exports = followers;
