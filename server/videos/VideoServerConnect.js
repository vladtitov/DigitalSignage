"use strict";
var dbDriver_1 = require("../db/dbDriver");
var models_1 = require("../../client/app/services/models");
var fs = require('fs');
var Q = require('q');
var path = require('path');
var http = require('http');
var FileDownloader = (function () {
    function FileDownloader() {
    }
    FileDownloader.prototype.download = function (url, destination, callBack) {
        var file = fs.createWriteStream(destination);
        http.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close();
                if (callBack)
                    callBack();
            }).on('error', function (err) {
                fs.unlink(destination);
                if (callBack)
                    callBack(err);
            });
        });
    };
    return FileDownloader;
}());
exports.FileDownloader = FileDownloader;
var VideoServerConnect = (function () {
    function VideoServerConnect(folder) {
        this.folder = folder;
        this.server = SETTINGS.video_server;
    }
    VideoServerConnect.prototype.downloadFiles = function (asset, folder) {
        var _this = this;
        var def = Q.defer();
        folder += '/userVideos';
        var thumbs = asset.thumb.split(',');
        var url = this.server + '/' + asset.folder + '/' + asset.filename;
        var destination = path.resolve(WWW + '/' + folder + '/' + asset.filename);
        var down = new FileDownloader();
        down.download(url, destination, function (err) {
            if (err)
                def.reject(err);
            else {
                asset.path = folder + '/' + asset.filename;
                var ar = thumbs.map(function (item) {
                    return folder + '/' + item;
                });
                asset.thumb = ar.join(',');
                def.resolve(asset);
            }
        });
        thumbs.forEach(function (filename) {
            url = _this.server + '/' + asset.folder + '/' + filename;
            destination = path.resolve(WWW + '/' + folder + '/' + filename);
            down.download(url, destination);
        });
        return def.promise;
    };
    VideoServerConnect.prototype.sendNotification = function (asset) {
        var def = Q.defer();
        var url = this.server + '/' + 'wake-up';
        console.log('sendNotification ' + url);
        http.get(url, function (res) {
            console.log('sendNotification res', res);
            def.resolve(res);
        });
        return def.promise;
    };
    VideoServerConnect.prototype.insertProcess = function (asset) {
        var _this = this;
        console.log('insertProcess');
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        asset.status = 'newvideo';
        asset.timestamp = Math.round(Date.now() / 1000);
        db.insertRow(asset, 'process').done(function (res) {
            var db = new dbDriver_1.DBDriver(_this.folder);
            asset.process_id = res.insertId;
            _this.sendNotification(asset);
            db.insertRow(asset, 'assets').done(function (res) { return def.resolve(res); }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoServerConnect.prototype.getStatus = function (id) {
        var db = new dbDriver_1.DBDriver(null);
        return db.selectColumnsById(id, 'status', 'process');
    };
    VideoServerConnect.prototype.updateStatus = function (process_id, status, folder) {
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        db.updateRow({ id: process_id, status: status }, 'process').done(function (res) {
            var db2 = new dbDriver_1.DBDriver(folder);
            db2.updateRowByColumn({ process_id: process_id, status: status }, 'process_id', 'assets').done(function (res) { return def.resolve(res); }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoServerConnect.prototype.finalize = function (asset, folder) {
        var _this = this;
        var def = Q.defer();
        this.saveAssetData(asset, folder).done(function (res) { return _this.updateStatus(asset.id, 'ready', folder).done(function (res) {
            asset.status = 'ready';
            def.resolve(asset);
        }, function (err) { return def.reject(err); }); }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoServerConnect.prototype.saveAssetData = function (asset, folder) {
        var db2 = new dbDriver_1.DBDriver(folder);
        asset.process_id = asset.id;
        return db2.updateRowByColumn(new models_1.VOAsset(asset), 'process_id', 'assets');
    };
    VideoServerConnect.prototype.getAssetFolder = function (asset) {
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        db.selectById(asset.id, 'process').done(function (row) {
            if (row)
                def.resolve(row.folder);
            else
                def.reject('notexists');
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoServerConnect.prototype.getNextVideo = function () {
        var status = 'newvideo';
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        db.selectByValue(status, 'status', 'process').done(function (res) {
            var out;
            for (var i = 0, n = res.length; i < n; i++) {
                var asset = res[i];
                if (fs.existsSync(WWW + '/' + asset.path)) {
                    asset.status = 'requested';
                    out = asset;
                    break;
                }
                else
                    db.deleteById(asset.id, 'process');
            }
            if (out) {
                db.updateRow({ id: out.id, status: 'requested' }, 'process');
            }
            def.resolve(out || {});
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    return VideoServerConnect;
}());
exports.VideoServerConnect = VideoServerConnect;
//# sourceMappingURL=VideoServerConnect.js.map