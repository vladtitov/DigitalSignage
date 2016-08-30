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
        http.get(this.url, function (response) {
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
var VideoServerConnect = (function () {
    function VideoServerConnect() {
        this.server = 'http://192.168.1.12:56555';
    }
    VideoServerConnect.prototype.downloadFiles = function (asset, folder) {
        var def = Q.defer();
        folder += '/userVideos';
        var thumbs = asset.thumb.split(',');
        var down = new FileDownloader(this.server + '/' + asset.folder + '/' + asset.filename, folder, asset.filename);
        down.onComplete = function (err) {
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
        };
        down.getFile();
        thumbs.forEach(function (filename) {
            var d = new FileDownloader(asset.folder + '/' + filename, folder, filename);
            d.getFile();
        });
        return def.promise;
    };
    VideoServerConnect.prototype.sendNotification = function (asset) {
        var def = Q.defer();
        http.get(this.server + '/' + 'newvideo' + '/' + asset.process_id, function (res) {
            def.resolve(res);
        });
        return def.promise;
    };
    VideoServerConnect.prototype.insertProcess = function (asset) {
        var _this = this;
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
        return db.selectColumsById(id, 'status', 'process');
    };
    VideoServerConnect.prototype.updateStatus = function (asset, folder) {
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        db.updateRow({ id: asset.id, status: asset.status }, 'process').done(function (res) {
            var db2 = new dbDriver_1.DBDriver(folder);
            db2.updateRowByColumn({ process_id: asset.id, status: asset.status }, 'process_id', 'assets').done(function (res) { return def.resolve(asset); }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoServerConnect.prototype.finalize = function (asset, folder) {
        var _this = this;
        var def = Q.defer();
        this.saveAssetData(asset, folder).done(function (res) { return _this.updateStatus(asset, folder).done(function (res) { return def.resolve(asset); }, function (err) { return def.reject(err); }); }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoServerConnect.prototype.saveAssetData = function (asset, folder) {
        var db2 = new dbDriver_1.DBDriver(folder);
        asset.process_id = asset.id;
        return db2.updateRowByColumn(new models_1.VOAsset(asset), 'process_id', 'assets');
    };
    VideoServerConnect.prototype.updateProcessed = function (asset) {
        var _this = this;
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        db.selectById(asset.id, 'process').done(function (row) {
            if (row) {
                var folder = row.folder;
                _this.updateStatus(asset, folder).done(function (res) { return def.resolve(folder); }, function (err) { return def.reject(err); });
            }
            else
                def.reject('notexists');
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    VideoServerConnect.prototype.getNextVideo = function (status) {
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        var sql = 'SELECT * FROM process WHERE status=?';
        db.selectAll(sql, [status]).done(function (res) {
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