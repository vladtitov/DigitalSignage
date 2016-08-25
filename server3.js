"use strict";
var express = require('express');
var request = require('request');
var http = require('http');
var models_1 = require("./client/app/services/models");
var fs = require('fs');
;
var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(__dirname + '/videos');
var myserver = 'http://192.168.1.10:56777/';
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(WWW));
var port = process.env.PORT || 56555;
app.listen(port, function () {
    console.log('http://' + port);
});
var FileDownloader = (function () {
    function FileDownloader(asset, server) {
        this.asset = asset;
        this.server = server;
    }
    FileDownloader.prototype.getFile = function () {
        var _this = this;
        this.downloader(function (err) {
            if (_this.onComplete)
                _this.onComplete(err);
        });
    };
    FileDownloader.prototype.downloader = function (callBack) {
        var dest = WWW + '/' + this.asset.filename;
        this.destination = dest;
        console.log(dest);
        var file = fs.createWriteStream(dest);
        var url = this.server + '/' + this.asset.path;
        console.log(url);
        http.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(callBack);
            }).on('error', function (err) {
                fs.unlink(dest);
                if (callBack)
                    callBack(err);
            });
        });
    };
    return FileDownloader;
}());
var MyVideos = (function () {
    function MyVideos(server) {
        this.server = server;
        this.getNewVideos();
    }
    MyVideos.prototype.downloadAsset = function (asset) {
        var dwd = new FileDownloader(asset, this.server);
        dwd.onComplete = function (err) {
            console.log('oncomplete error ' + err);
        };
        dwd.getFile();
    };
    MyVideos.prototype.getNewVideos = function () {
        var _this = this;
        request.get(this.server + 'videoserver/get-new-file', function (error, response, body) {
            var res = JSON.parse(body);
            if (res.data) {
                var asset = new models_1.VOAsset(res.data);
                var jsonfile = 'asset_' + asset.id + '.json';
                fs.writeFile(WWW + '/' + jsonfile, JSON.stringify(asset), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    _this.downloadAsset(asset);
                    console.log("The file was saved!");
                });
                console.log(asset);
            }
        });
    };
    return MyVideos;
}());
var manager = new MyVideos(myserver);
//# sourceMappingURL=server3.js.map