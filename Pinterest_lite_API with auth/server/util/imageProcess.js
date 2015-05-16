var gm = require('gm'),
    fs = require('fs'),
    request = require('request'),
    sha1 = require('sha1');

module.exports = {

    downloadFile: function (uri, filePath, done) {
        console.log("in downloadFile()");
        request(uri).pipe(fs.createWriteStream(filePath)).on('close', done);
    },

    resizeConvert: function (inPath, outPath, width, done) {
        console.log("in resizeConvert()");
        gm(inPath)
            .resize(width + '>')
            .write(outPath, done);
    },

    resizeConvertThumb: function (inPath, outPath, width, thumbDB, fileDB, done) {
        console.log("in resizeConvert()");
        gm(inPath)
            .resize(width + '>')
            .write(outPath, function(err){if(!err) console.log('thumb image saved')});
        done(thumbDB);
    },

    process: function (uri, done) {
        console.log("in process()");
        var self = this;
        var self2 = this;
        var fileName = sha1(uri);
        var filePath = "public/images/posts/full/" + fileName + ".png";
        var thumbFilePath = "public/images/posts/thumbs/" + fileName + ".png";
        var thumbDB = "images/posts/thumbs/" + fileName + ".png";
        var fileDB = "images/posts/full/" + fileName + ".png";

        this.downloadFile(uri, filePath, function () {
            self.resizeConvert(filePath, filePath, 700, function (){
                self2.resizeConvertThumb(filePath, thumbFilePath, 300, thumbDB, fileDB, done)
            });
        });
    }

};