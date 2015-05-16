var express = require('express');
var router = express.Router();

var db = require('mysql');
var connection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'NS73ur29'
});

connection.query('USE Pinterest_lite', function (err) {
    if (err) throw err;
});


var auth = require('./auth.js');
var users = require('./users.js');
var post = require('./post.js');
var images = require('./images.js');
var followers = require('./followers.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.get('/images/imagesFromURL', images.imagesFromURL);
router.get('/users/getUsers', users.getUsers);
router.post('/users/createUser', users.createUser);
router.get('/post/getPosts', post.getPosts);
router.get('/post/tagComment', post.tagComment);
router.get('/post/getComments', post.getComments);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/users/deleteUser', users.deleteUser);
router.post('/api/v1/users/updateUser', users.updateUser);
router.get('/api/v1/followers/getFollowees', followers.getFollowees);
router.get('/api/v1/followers/getNumFollowees', followers.getNumFollowees);
router.get('/api/v1/followers/createFollower', followers.createFollower);
router.get('/api/v1/followers/deleteFollowee', followers.deleteFollowee);
router.get('/api/v1/post/getPostsByUser', post.getPostsByUser);
router.post('/api/v1/post/createPost', post.createPost);
router.get('/api/v1/post/deletePost', post.deletePost);
router.post('/api/v1/post/updatePost', post.updatePost);

module.exports = router;

