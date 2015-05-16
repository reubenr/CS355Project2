var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var db = require('mysql');
var connection = db.createConnection({
    host     : 'localhost',
    user     : '',
    password : ''
});

connection.query('USE Pinterest_lite', function (err) {
    if (err) throw err;
});



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers",'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));



module.exports = app;