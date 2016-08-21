"use strict";
var Q = require('q');
var TableModel_1 = require("../db/TableModel");
var path = require('path');
var Jimp = require("jimp");
var fs = require('fs');
var ImageProcess = (function () {
    function ImageProcess(folder) {
        this.folder = folder;
        this.thumbSize = 128;
        this.tempFolder = SERVER + '/uploads/thumbnails/';
    }
    ImageProcess.prototype.makeThumbnail = function (asset) {
        var _this = this;
        var deferred = Q.defer();
        Jimp.read(asset.path).then(function (image) {
            asset.width = image.bitmap.width;
            asset.height = image.bitmap.height;
            try {
                var isLandScape = image.bitmap.height < image.bitmap.width;
                var p = isLandScape ? image.resize(Jimp.AUTO, _this.thumbSize) :
                    image.resize(_this.thumbSize, Jimp.AUTO);
            }
            catch (e) {
                deferred.reject(e);
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
            asset.thumb = _this.folder + 'thumbnails/' + asset.filename;
            p.write(WWW + asset.thumb, function (err) {
                if (err)
                    deferred.reject(err);
                else
                    deferred.resolve(asset);
            });
        }).catch(function (err) {
            console.error(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };
    ImageProcess.prototype.processImage = function (asset) {
        var _this = this;
        var deferred = Q.defer();
        this.makeThumbnail(asset).then(function (asset) {
            console.log('ip.makeThumbnail done ');
            var newPath = _this.folder + 'userImages/' + asset.filename;
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
    ImageProcess.prototype.insertInDB = function (asset) {
        var deferred = Q.defer();
        var mytable = new TableModel_1.TableModel(this.folder, "assets");
        var promise = mytable.insertContent(asset);
        promise.then(function (result) {
            deferred.resolve(result);
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
    };
    ;
    return ImageProcess;
}());
exports.ImageProcess = ImageProcess;
//# sourceMappingURL=ImageProcess.js.map