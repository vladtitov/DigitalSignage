"use strict";
var express = require('express');
var request = require('request');
var http = require('http');
var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(__dirname + '/videos');
GLOBAL.SERVER = path.resolve(__dirname + '/server');
var models_1 = require("./client/app/services/models");
var VideoProcess_1 = require("./server/assets/VideoProcess");
var fs = require('fs');
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
        var dest = path.resolve(this.asset.workingFolder + '/' + this.asset.filename);
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
    MyVideos.prototype.sendReady = function (asset) {
        var url = this.server + 'videoserver/ready';
        console.log(url);
        request.post(url, { json: true, body: asset }, function (err, res, body) {
            console.log(err);
            console.log(body);
        });
    };
    MyVideos.prototype.downloadAsset = function (asset) {
        var _this = this;
        var dwd = new FileDownloader(asset, this.server);
        dwd.onComplete = function (err) {
            if (err) {
                _this.onError(err, asset);
                console.log(err);
                return;
            }
            var processor = new VideoProcess_1.VideoProcess(null);
            processor.processVideo(asset).done(function (asset) {
                asset.status = 'processed';
                var jsonfile = 'asset_' + asset.id + '.json';
                fs.writeFile(path.resolve(WWW + '/ready/' + jsonfile), JSON.stringify(asset), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Ready asset ");
                    _this.sendReady(asset);
                });
                console.log(asset);
            }, function (err) {
                console.log(err);
            });
            console.log('oncomplete error ' + err);
        };
        dwd.getFile();
    };
    MyVideos.prototype.onError = function (err, asset) {
        console.log('onError ', err);
        console.log('onError ', asset);
    };
    MyVideos.prototype.startProcess = function (asset) {
        var _this = this;
        fs.writeFile(path.resolve(asset.workingFolder + '/asset.json'), JSON.stringify(asset), function (err) {
            if (err) {
                _this.onError(err, asset);
                console.log(err);
            }
            else {
                _this.downloadAsset(asset);
                console.log("new asset " + asset.workingFolder);
            }
        });
    };
    MyVideos.prototype.getNewVideos = function () {
        var _this = this;
        console.log(this.server + 'videoserver/get-new-file');
        request.get(this.server + 'videoserver/get-new-file', function (error, response, body) {
            if (error) {
                _this.onError(error, null);
                return;
            }
            var res;
            try {
                res = JSON.parse(body);
            }
            catch (e) {
                _this.onError(body, null);
            }
            console.log(body);
            if (res && res.data) {
                var asset = new models_1.VOAsset(res.data);
                asset.workingFolder = path.resolve(WWW + '/' + asset.folder);
                if (fs.existsSync(asset.workingFolder)) {
                    _this.startProcess(asset);
                }
                else {
                    fs.mkdir(asset.workingFolder, function (err) {
                        if (err) {
                            _this.onError(err, asset);
                            console.log(err);
                        }
                        else {
                            _this.startProcess(asset);
                        }
                    });
                }
            }
            else
                _this.onError(res, null);
        });
    };
    return MyVideos;
}());
var manager = new MyVideos(myserver);
//# sourceMappingURL=server3.js.map