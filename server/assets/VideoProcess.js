"use strict";
var Q = require('q');
var TableModel_1 = require("../db/TableModel");
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(SERVER + "/ffmpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath(SERVER + "/ffmpeg/bin/ffprobe.exe");
var VideoProcess = (function () {
    function VideoProcess(folder) {
        this.folder = folder;
    }
    VideoProcess.prototype.makeThumbnails = function (asset) {
        var deferred = Q.defer();
        var filename = asset.filename;
        var srcPath = asset.path;
        var cientFolder = this.folder + 'userVideos/';
        var destPath = cientFolder + filename;
        var thumbs;
        var w = 256;
        var k = w / asset.width;
        var h = Math.round(asset.height * k);
        if (asset.height > asset.width) {
            h = 256;
            k = h / asset.height;
            w = Math.round(asset.width * k);
        }
        var proc = ffmpeg(WWW + srcPath)
            .on('filenames', function (filenames) {
            thumbs = filenames.map(function (val) {
                return cientFolder + val;
            });
            asset.thumb = thumbs.join(', ');
        })
            .on('end', function () {
            deferred.resolve(asset);
            console.log('screenshots   saved');
        })
            .on('error', function (err) {
            deferred.reject(err);
        })
            .takeScreenshots({
            filename: filename + '.png',
            timemarks: ['10%', '30%', '50%'],
            size: w + 'x' + h
        }, WWW + cientFolder);
        return deferred.promise;
    };
    VideoProcess.prototype.convertVideo = function (asset) {
        var def = Q.defer();
        var filename = asset.filename;
        var srcPath = asset.path;
        var cientFolder = this.folder + 'userVideos/';
        var destPath = cientFolder + filename.substr(0, filename.lastIndexOf('.')) + '.mp4';
        var cientFolder = this.folder + 'userVideos/';
        ffmpeg(srcPath)
            .on('end', function () {
            console.log('end convert');
            asset.path = destPath;
            def.resolve(asset);
        })
            .on('error', function (err) {
            def.reject(err);
        })
            .videoCodec('libx264')
            .format('mp4')
            .save(WWW + destPath);
        return def.promise;
    };
    VideoProcess.prototype.getMetadata = function (asset) {
        var deferred = Q.defer();
        this.metadata = ffmpeg.ffprobe(asset.path, function (err, mdata) {
            if (err) {
                deferred.reject(err);
                return;
            }
            var stream = mdata.streams[0];
            asset.width = stream.width;
            asset.height = stream.height;
            asset.duration = Math.round(stream.duration);
            deferred.resolve(asset);
        });
        return deferred.promise;
    };
    VideoProcess.prototype.processVideo = function (asset) {
        var _this = this;
        var deferred = Q.defer();
        this.getMetadata(asset).then(function (asset) {
            _this.convertVideo(asset).then(function (asset) {
                _this.makeThumbnails(asset).then(function (asset) {
                    _this.insertInDB(asset).then(function (result) {
                        deferred.resolve(result);
                    }, function (err) { deferred.reject(err); });
                }, function (err) { deferred.reject(err); });
            }, function (err) { deferred.reject(err); });
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
    };
    ;
    VideoProcess.prototype.insertInDB = function (asset) {
        var deferred = Q.defer();
        var mytable = new TableModel_1.TableModel(this.folder, "assets");
        var promise = mytable.insertContent(asset);
        promise.then(function (result) {
            deferred.resolve(result);
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
    };
    ;
    return VideoProcess;
}());
exports.VideoProcess = VideoProcess;
//# sourceMappingURL=VideoProcess.js.map