"use strict";
var dbDriver_1 = require("../db/dbDriver");
var models_1 = require("../../client/app/services/models");
var fs = require('fs');
var Q = require('q');
var path = require('path');
var http = require('http');
var FileDownloader = (function () {
    function FileDownloader(url, folder, filename) {
        this.url = url;
        this.folder = folder;
        this.filename = filename;
        this.server = 'http://192.168.1.10:56555';
    }
    FileDownloader.prototype.getFile = function () {
        var _this = this;
        this.downloader(function (err) {
            if (_this.onComplete)
                _this.onComplete(err);
        });
    };
    FileDownloader.prototype.downloader = function (callBack) {
        var dest = path.resolve(WWW + '/' + this.folder + '/' + this.filename);
        var file = fs.createWriteStream(dest);
        var url = this.server + '/' + this.url;
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
exports.FileDownloader = FileDownloader;
var VideoManager = (function () {
    function VideoManager() {
    }
    VideoManager.prototype.downloadFiles = function (asset, folder) {
        var def = Q.defer();
        folder += '/userVideos';
        var down = new FileDownloader(asset.folder + '/' + asset.filename, folder, asset.filename);
        down.onComplete = function (err) {
            if (err)
                def.reject(err);
            else
                def.resolve(asset);
        };
        down.getFile();
        var thumbs = asset.thumb.split(',');
        thumbs.forEach(function (filename) {
            var d = new FileDownloader(asset.folder + '/' + filename, folder, filename);
            d.getFile();
        });
        return def.promise;
    };
    VideoManager.prototype.updateDatabases = function (asset, folder) {
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        var db2 = new dbDriver_1.DBDriver(folder);
        console.log('  updateDatabases  folder   ' + folder);
        db.updateRow({ id: asset.id, status: asset.status }, 'process').done(function (res) {
            console.log(res);
            var asset2 = new models_1.VOAsset(asset);
            asset2.process_id = asset.id;
            delete asset2.id;
            delete asset2.token;
            db2.updateRowByColumn(asset2, 'process_id', 'assets').done(function (res) { return def.resolve(res); }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoManager.prototype.finalize = function (asset, folder) {
        var asset2 = new models_1.VOAsset({ id: asset.id, status: asset.status });
        return this.updateDatabases(asset2, folder);
    };
    VideoManager.prototype.registerReady = function (asset) {
        var _this = this;
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        db.selectById(asset.id, 'process').done(function (row) {
            if (row) {
                _this.updateDatabases(asset, row.folder).done(function (res) { return def.resolve(asset); }, function (err) { return def.reject(err); });
            }
            else
                def.reject('notexists');
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoManager.prototype.getNextVideo = function () {
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        var sql = 'SELECT * FROM process';
        db.queryAll(sql).done(function (res) {
            var out;
            for (var i = 0, n = res.length; i < n; i++) {
                var asset = res[i];
                if (fs.existsSync(WWW + '/' + asset.path)) {
                    out = asset;
                    break;
                }
                else
                    db.deleteById(asset.id, 'process');
            }
            def.resolve(out);
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    return VideoManager;
}());
exports.VideoManager = VideoManager;
//# sourceMappingURL=VideoManager.js.map