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
    FileProcessing.prototype.uploadFile = function (req, res) {
        var deferred = Q.defer();
        var storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, SERVER + '/uploads/' + file.fieldname);
            },
            filename: function (req, file, callback) {
                callback(null, '_' + Date.now() + '_' + file.originalname);
            }
        });
        function fileFilter(req, file, cb) {
            var ext = file.originalname.substr(file.originalname.length - 3);
            if (ext === 'jpg' || ext === 'peg' || ext === 'png') {
                cb(null, true);
            }
            else if (ext === 'mov' || ext === 'avi') {
                cb(null, true);
            }
            else {
                cb(new Error('file type not supported'));
            }
        }
        var upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');
        upload(req, res, function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                var asset = new models_1.VOAsset({});
                asset.originalname = req.file.originalname;
                asset.size = req.file.size;
                asset.path = req.file.path;
                asset.mimetype = req.file.mimetype;
                asset.filename = req.file.filename;
                var ext = asset.originalname.substr(asset.originalname.length - 3);
                if (ext === 'jpg' || ext === 'peg' || ext === 'png') {
                    asset.type = 'image';
                }
                else if (ext === 'mov' || ext === 'avi') {
                    asset.type = 'video';
                }
                fs.stat(asset.path, function (err, stats) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        if (asset.size === stats["size"]) {
                            deferred.resolve(asset);
                        }
                        else {
                            deferred.reject({ assetSize: asset.size, reason: 'not equal stat size' });
                        }
                    }
                });
            }
        });
        return deferred.promise;
    };
    FileProcessing.prototype.uploadFile2 = function (req, res, folder) {
        var def = Q.defer();
        var upload = multer({ dest: WWW + '/' + folder + '/uploads' }).single('file');
        upload(req, res, function (err) {
            var newname = '_' + Math.round(Date.now() / 1000) + '_' + req.file.originalname;
            var file = req.file;
            var newdestination = path.resolve(file.destination + '/' + newname);
            fs.rename(file.path, newdestination, function (err) {
                if (err)
                    def.reject(err);
                else {
                    delete file.fieldname;
                    delete file.destination;
                    var asset = new models_1.VOAsset(file);
                    asset.path = newdestination;
                    asset.filename = newname;
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