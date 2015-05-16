var db = require('mysql');
var connection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'NS73ur29'
});

connection.query('USE Pinterest_lite', function (err) {
    if (err) throw err;
});

var imageProcess = require('../util/imageProcess.js');


var post = {

getPostsByUser: function (req, res) {
    user = req.query.userID;
    var myQry = 'SELECT p.Description, p.UserID, p.PostID, p.OrigImgURL, p.LocalImgURL, u.FName, u.LName FROM Post as p Join User as u on p.UserID = u.UserID WHERE p.UserID = ' + user;
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;

            } else {
                console.log(result[0]);
                console.log(result);
                res.json({posts: result});
            }
        }
    );
},


getPosts: function (req, res) {
    //var myQry = 'SELECT p.Description, p.UserID, p.PostID, p.OrigImgURL, p.LocalImgURL, u.FName, u.LName FROM Post as p Join User as u on p.UserID = u.UserID';

    var myQry = 'SELECT * FROM PostsUser';
    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;

            } else {
                console.log(result[0]);
                console.log(result);
                res.json({posts: result});
            }
        }
    );
},


getComments: function (req, res) {
    post = req.query.postID;
    var myQry = 'SELECT Comment FROM Post_Comment WHERE PostID = ' + post;
    console.log(myQry);
    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;

            } else {
                console.log(result);
                res.json({comments: result});
            }
        }
    );
},






//send UserID, Original Image URL: OrigImgURL, Description
//Uses GraphicsMagick package to resize image twice
createPost: function (req, res) {
    var url = req.body.ImgURL;

    imageProcess.process(url,
        function (localImgURL) {
            var post = {UserID: req.body.UserID, LocalImgURL: localImgURL, OrigImgURL: req.body.OrigImgURL, Description: req.body.Description};
            var myQry = connection.query('INSERT INTO Post Set ?', post, function(err, result){
                if (err){
                console.log(err.code);
                console.log(err.fatal);
                throw err;
                }
            console.log('inserted ' + result.affectedRows + ' rows');
            res.json(true);
        });
    });

},


//send PostID, and Tag text and comment text
tagComment: function (req, res) {
    console.log(req.PostID);
    var PostID = req.query.PostID;
    var TagText = req.query.TagText;
    var CommentText = req.query.CommentText;
    var myQry = connection.query('CALL comment_tag(?, ?, ?)', [CommentText, TagText, PostID], function(err, result){
        if (err){
            console.log('errorrrrrrr');
            console.log(err.code);
            console.log(err.fatal);
            throw err;
        }
        console.log('inserted ' + result.affectedRows + ' rows');
        res.json(true);
    });
    console.log(myQry.sql);
},






//send current session UserID: CurUserID, post UserID: UserID, PostID;
deletePost: function (req, res) {
    var PostID =  req.query.PostID;
    var UserID = req.query.UserID;
    if (PostID === PostID){
        var myQry = connection.query('DELETE FROM Post WHERE PostID= ?', [PostID], function(err, result){
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


//send current session UserID: CurUserID, post UserID: UserID, PostID, 'New Description;
updatePost: function (req, res) {
    var PostID = req.body.PostID;
    var UserID = req.body.UserID;
    var Description = req.body.Description;
    console.log(Description, UserID, PostID);
    if (PostID === PostID) {
        var myQry = connection.query('Update Post Set Description= ? WHERE PostID= ?', [Description, PostID], function (err, result) {
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


module.exports = post;