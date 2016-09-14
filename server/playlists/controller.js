"use strict";
var Q = require('q');
var models_1 = require("../../client/app/services/models");
var dbDriver_1 = require("../db/dbDriver");
var PlayListsController = (function () {
    function PlayListsController(folder) {
        this.folder = folder;
    }
    PlayListsController.prototype.getPlaylistTimestamp = function (id) {
        var db = new dbDriver_1.DBDriver(this.folder);
        var sql = 'SELECT timestamp FROM playlists WHERE id=' + id;
        return db.queryOne(sql);
    };
    PlayListsController.prototype.getPlaylistWithAssets = function (id, folder) {
        var _this = this;
        var def = Q.defer();
        this.getPlaylistProps(id, folder).done(function (playlis) {
            _this.getPlaylistAssets(id, folder).done(function (assets) {
                def.resolve(new models_1.VOPlaylist({ props: playlis, list: assets }));
            }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    PlayListsController.prototype.getPlaylistProps = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryOne('SELECT * FROM playlists WHERE id=' + id);
    };
    PlayListsController.prototype.getPlaylistAssets = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT * FROM playlists_assets LEFT JOIN assets ON assets.id = playlists_assets.asset_id WHERE playlist_id=' + id);
    };
    PlayListsController.prototype.getAllPlaylists_Assets = function (folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT *, playlists_assets.id AS id ' +
            'FROM playlists_assets ' +
            'LEFT JOIN assets ON assets.id = playlists_assets.asset_id');
    };
    PlayListsController.prototype.getAllPlaylistWithAssets = function (folder) {
        var _this = this;
        var def = Q.defer();
        this.getAllPlaylistsProps(folder).done(function (playlists) {
            _this.getAllPlaylists_Assets(folder).done(function (assets) {
                var out = [];
                playlists.forEach(function (playlist) {
                    var list = assets.filter(function (asset) { return asset.playlist_id === playlist.id; });
                    out.push(new models_1.VOPlaylist({ props: playlist, list: list }));
                });
                def.resolve(out);
            }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    PlayListsController.prototype.getAllPlaylistsProps = function (folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT * FROM playlists');
    };
    PlayListsController.prototype.getUsedLayoutsLabels = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT DISTINCT layout_id AS id, layouts.label ' +
            'FROM layouts_viewports ' +
            'LEFT JOIN layouts ON layouts.id = layouts_viewports.layout_id ' +
            'WHERE playlist_id = ' + id);
    };
    PlayListsController.prototype.deletePlaylist = function (id, folder) {
        var deferred = Q.defer();
        var timestamp = Math.floor(Date.now() / 1000);
        var db = new dbDriver_1.DBDriver(folder);
        db.runQuery('UPDATE layouts SET timestamp = ' + timestamp +
            ' WHERE id IN ' +
            '(SELECT DISTINCT layout_id AS id FROM layouts_viewports ' +
            'LEFT JOIN layouts ON layouts.id = layouts_viewports.layout_id ' +
            'WHERE playlist_id = ' + id + ')').done(function (res) { return db.runQuery('UPDATE layouts_viewports SET playlist_id = 0, image = null WHERE playlist_id = ' + id).done(function (res) { return db.runQuery('DELETE FROM playlists_assets WHERE playlist_id = ' + id).done(function (res) { return db.runQuery('DELETE FROM playlists WHERE id = ' + id).done(function (res) { return deferred.resolve(res); }, function (err) { return deferred.reject(err); }); }, function (err) { return deferred.reject(err); }); }, function (err) { return deferred.reject(err); }); }, function (err) { return deferred.reject(err); });
        return deferred.promise;
    };
    return PlayListsController;
}());
exports.PlayListsController = PlayListsController;
//# sourceMappingURL=controller.js.map