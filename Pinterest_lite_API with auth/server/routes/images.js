
var cheerio = require("cheerio");
var request = require('request');
var images = {


//get images from URL
imagesFromURL: function (req, res) {
    console.log('this is the request url');
    var url = req.query.url;
    var baseURL;
    var delimiter = '/',
        end = 3,
        tokens = url.split(delimiter).slice(0, end),
        baseURL = tokens.join(delimiter);
    baseURL = baseURL + '/';
    console.log('baseURL :' + baseURL);
    console.log(url);
    download(url, function (data) {
        if (data) {
            var imgs = [];
            var $ = cheerio.load(data);
            $("img").each(function (i, e) {
                e = $(e).attr("src");
                console.log('e :' + e);
                if (e.substr(0, 6) === "http:/" || e.substr(0, 7) === "https:/") {
                    console.log('http in front ' + e);
                }
                else if (e.charAt(0) === '/' && e.substr(0, 2) !== '//') {
                    console.log('/ in front ' + e);
                    e = e.substr(1);
                    e = baseURL + e;
                    console.log(e);
                }
                else if (e.substr(0, 2) === '//') {
                    console.log('// in front ' + e.substr(0, 2));
                    e = 'http:' + e;
                    console.log(e);
                }
                else {
                    console.log('other in front ' + e);
                    e = baseURL + e;
                    console.log(e);
                }
                imgs.push(e);
            });
            console.log(imgs);
            console.log("done");
            res.json(imgs);
        }
        else console.log("error");
    });
    }
};


// helper functions
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
        else{
            console.log('error in download function');
            callback(null);
        }
    });
}

module.exports = images;

