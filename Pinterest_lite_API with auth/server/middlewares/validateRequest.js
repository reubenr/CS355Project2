var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    var token = (req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var key = (req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    console.log(token + ' ' + key);
    if (token || key) {
        try {
            var decoded = jwt.decode(token, require('../config/secret.js')());
            console.log(decoded);
            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            }
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    }

    // Authorize the user to see if s/he can access our resources

    var dbUser = validateUser(key, next);
}
