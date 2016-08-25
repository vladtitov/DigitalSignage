"use strict";
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var path = require('path');
var Jimp = require("jimp");
var fs = require('fs');
var ImageProcess = (function () {
    function ImageProcess(folder) {
        this.folder = folder;
        this.thumbSize = 128;
    }
    ImageProcess.prototype.makeThumbnail = function (asset) {
        var _this = this;
        var def = Q.defer();
        var thumb = asset.path.replace('/userImages/', '/thumbnails/');
        Jimp.read(WWW + '/' + asset.path).then(function (image) {
            asset.width = image.bitmap.width;
            asset.height = image.bitmap.height;
            try {
                var isLandScape = image.bitmap.height < image.bitmap.width;
                var p = isLandScape ? image.resize(Jimp.AUTO, _this.thumbSize) :
                    image.resize(_this.thumbSize, Jimp.AUTO);
            }
            catch (e) {
                def.reject(e);
                return;
            }
            var x = 0;
            var y = 0;
            if (isLandScape) {
                x = (image.bitmap.width - _this.thumbSize) / 2;
            }
            else {
                y = (image.bitmap.height - _this.thumbSize) / 2;
            }
            p.write(WWW + '/' + thumb, function (err) {
                if (err) {
                    console.error(err);
                    def.reject(err);
                }
                else {
                    asset.thumb = thumb;
                    def.resolve(asset);
                }
            });
        }).catch(function (err) {
            console.error(err);
            def.reject(err);
        });
        return def.promise;
    };
    ImageProcess.prototype.processImage = function (asset) {
        var _this = this;
        var deferred = Q.defer();
        this.makeThumbnail(asset).then(function (asset) {
            console.log('ip.makeThumbnail done ');
            var newPath = _this.folder + '/userImages/' + asset.filename;
            fs.rename(asset.path, WWW + newPath, function (err) {
                if (err)
                    deferred.reject(err);
                else {
                    asset.path = newPath;
                    _this.insertInDB(asset).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) { deferred.reject(err); });
                }
            });
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
    };
    ImageProcess.prototype.processImage2 = function (asset) {
        var _this = this;
        var def = Q.defer();
        var newPath = this.folder + '/userImages/' + asset.filename;
        fs.rename(path.resolve(WWW + '/' + asset.path), path.resolve(WWW + '/' + newPath), function (err) {
            if (err) {
                console.log(err);
                def.reject(err);
            }
            else {
                asset.path = newPath;
                _this.makeThumbnail(asset).then(function (asset) {
                    _this.insertInDB(asset).then(function (res) { return def.resolve(res); }, function (err) { def.reject(err); });
                }, function (err) { def.reject(err); });
            }
        });
        return def.promise;
    };
    ImageProcess.prototype.insertInDB = function (asset) {
        var db = new dbDriver_1.DBDriver(this.folder);
        return db.insertRow(asset, 'assets');
    };
    ;
    return ImageProcess;
}());
exports.ImageProcess = ImageProcess;
//# sourceMappingURL=ImageProcess.js.map