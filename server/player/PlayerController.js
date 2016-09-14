"use strict";
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var PlayerController = (function () {
    function PlayerController() {
    }
    PlayerController.prototype.getAllDeviceswithLayoutImage = function (folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT *,layouts.image,layouts.label, devices.id AS id FROM devices LEFT JOIN layouts ON layouts.id = devices.layout_id');
    };
    PlayerController.prototype.getFolderByToken = function (token) {
        var db = new dbDriver_1.DBDriver(null);
        return db.selectOne('SELECT folder FROM users WHERE token=?', [token]);
    };
    PlayerController.prototype.getPlaylistStatsByLayout = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT layouts_viewports.id AS id, layouts_viewports.playlist_id,playlists.label,playlists.timestamp,' +
            'FROM layouts_viewports LEFT JOIN playlists ON layouts_viewports.playlist_id=playlists.id' +
            '  WHERE layouts_viewports.layout_id=' + id);
    };
    PlayerController.prototype.getPlaylistsByLayout = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT  layouts_viewports.*, playlists.timestamp AS platlist_stamp ' +
            ' FROM layouts_viewports LEFT JOIN playlists ON layouts_viewports.playlist_id=playlists.id' +
            ' WHERE layouts_viewports.layout_id=' + id);
    };
    PlayerController.prototype.getPlaylistStats = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryOne('SELECT id,label,timestamp FROM playlists WHERE id=' + id);
    };
    PlayerController.prototype.getPlaylistProps = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryOne('SELECT * FROM playlists WHERE id=' + id);
    };
    PlayerController.prototype.getLayout = function (id, folder) {
        var _this = this;
        var def = Q.defer();
        this.getLayoutProps(id, folder).done(function (layout) { return _this.getPlaylistsByLayout(id, folder).done(function (viewports) {
            layout.viewports = viewports;
            def.resolve(layout);
        }, function (err) { return def.reject(err); }); }, function (err) { return def.reject(err); });
        return def.promise;
    };
    PlayerController.prototype.getLayoutProps = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryOne('SELECT id,width,height,background,timestamp FROM layouts WHERE id=' + id);
    };
    PlayerController.prototype.getPlaylistAssets = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryAll('SELECT playlists_assets.* , playlists_assets.id AS id, ' +
            'assets.height, assets.width, assets.duration, assets.path, assets.type, assets.mime, assets.orig_dimension, assets.active, assets.time_from, assets.time_to' +
            ', playlists.timestamp AS playlists_stamp,  playlists.time_from AS playlists_from,  playlists.time_to AS playlists_to ' +
            ' FROM playlists_assets' +
            ' LEFT JOIN assets ON assets.id = playlists_assets.asset_id ' +
            ' LEFT JOIN playlists ON playlists.id = playlists_assets.playlist_id ' +
            'WHERE playlist_id=' + id);
    };
    PlayerController.prototype.getDeviceAndLayoutStamps = function (id, folder) {
        var db = new dbDriver_1.DBDriver(folder);
        return db.queryOne('SELECT devices.id AS id, devices.label, devices.layout_id, layouts.label as llabel,' +
            ' devices.timestamp AS dstamp,layouts.timestamp AS lstamp ' +
            'FROM devices LEFT JOIN layouts ON devices.layout_id=layouts.id ' +
            ' WHERE devices.id=' + id);
    };
    return PlayerController;
}());
exports.PlayerController = PlayerController;
//# sourceMappingURL=PlayerController.js.map