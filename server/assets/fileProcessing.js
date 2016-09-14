"use strict";
var Q = require('q');
var models_1 = require("../../client/app/services/models");
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var FileProcessing = (function () {
    function FileProcessing(folder) {
        this.folder = folder;
    }
    FileProcessing.prototype.uploadFile2 = function (req, res, folder) {
        var def = Q.defer();
        console.log('uploadFile2');
        var uploadFolder = folder + '/uploads';
        var upload = multer({ dest: WWW + '/' + uploadFolder }).single('file');
        upload(req, res, function (err) {
            var newname = '_' + Math.round(Date.now() / 1000) + '_' + req.file.originalname;
            var file = req.file;
            var newpath = path.resolve(file.destination + '/' + newname);
            fs.rename(file.path, newpath, function (err) {
                if (err)
                    def.reject(err);
                else {
                    delete file.fieldname;
                    delete file.destination;
                    var asset = new models_1.VOAsset(file);
                    asset.filename = newname;
                    asset.path = uploadFolder + '/' + asset.filename;
                    def.resolve(asset);
                }
            });
        });
        return def.promise;
    };
    FileProcessing.prototype.deleteFile = function (thumbnailPath, originaImagePath) {
        var deferred = Q.defer();
        fs.unlink(thumbnailPath, function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                fs.unlink(originaImagePath, function (err) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve();
                    }
                });
            }
        });
        return deferred.promise;
    };
    return FileProcessing;
}());
exports.FileProcessing = FileProcessing;
//# sourceMappingURL=fileProcessing.js.map