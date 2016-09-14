"use strict";
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var AssetsController = (function () {
    function AssetsController() {
    }
    AssetsController.prototype.getUsedPlaylist = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT DISTINCT playlist_id AS id, playlists.label ' +
            'FROM playlists_assets ' +
            'LEFT JOIN playlists ON playlists.id = playlists_assets.playlist_id ' +
            'WHERE asset_id = ' + id);
    };
    AssetsController.prototype.deleteAsset = function (id, folder) {
        var deferred = Q.defer();
        var timestamp = Math.floor(Date.now() / 1000);
        var db = new dbDriver_1.DBDriver(folder);
        db.runQuery('UPDATE playlists SET timestamp = ' + timestamp +
            ' WHERE id IN ' +
            '(SELECT DISTINCT playlist_id AS id FROM playlists_assets ' +
            'LEFT JOIN playlists ON playlists.id = playlists_assets.playlist_id ' +
            'WHERE asset_id = ' + id + ')').done(function (res) { return db.runQuery('DELETE FROM playlists_assets WHERE asset_id = ' + id).done(function (res) { return db.runQuery('DELETE FROM assets WHERE id = ' + id).done(function (res) { return deferred.resolve(res); }, function (err) { return deferred.reject(err); }); }, function (err) { return deferred.reject(err); }); }, function (err) { return deferred.reject(err); });
        return deferred.promise;
    };
    AssetsController.prototype.getAssets = function (assetsID, folder) {
        var deferred = Q.defer();
        var db = new dbDriver_1.DBDriver(folder);
        var sql = 'SELECT * FROM assets WHERE id = ' + assetsID.join(' OR id = ');
        db.queryAll(sql).done(function (res) {
            var assetsArr = [];
            for (var i = 0; i < assetsID.length; i++) {
                res.forEach(function (val) {
                    if (assetsID[i] === val.id)
                        assetsArr.push(val);
                });
            }
            deferred.resolve(assetsArr);
        }, function (err) { return deferred.reject(err); });
        return deferred.promise;
    };
    return AssetsController;
}());
exports.AssetsController = AssetsController;
//# sourceMappingURL=AssetsController.js.map