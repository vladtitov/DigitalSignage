"use strict";
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var fs = require('fs');
var VideoProcess = (function () {
    function VideoProcess(folder) {
        this.folder = folder;
    }
    VideoProcess.prototype.saveInDatabase = function (asset) {
        var _this = this;
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        asset.status = 'newvideo';
        asset.timestamp = Math.round(Date.now() / 1000);
        db.insertRow(asset, 'process').done(function (res) {
            var db = new dbDriver_1.DBDriver(_this.folder);
            asset.process_id = res.insertId;
            db.insertRow(asset, 'assets').done(function (res) { return def.resolve(res); }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    ;
    return VideoProcess;
}());
exports.VideoProcess = VideoProcess;
//# sourceMappingURL=VideoProcess.js.map