"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Q = require('q');
var TableModel_1 = require("../db/TableModel");
var Playlists_Assets_1 = require("./Playlists_Assets");
var models_1 = require("../../client/app/services/models");
;
var PlaylistItemsTable = (function (_super) {
    __extends(PlaylistItemsTable, _super);
    function PlaylistItemsTable(folder) {
        _super.call(this, folder, "playlists_assets", new Playlists_Assets_1.Playlists_Assets());
    }
    PlaylistItemsTable.prototype.deletePlatlist = function (id) {
        var sql = "DELETE FROM " + this.table + " WHERE playlist_id =? ";
        return this.db.deleteQuery(sql, [id]);
    };
    PlaylistItemsTable.prototype.updatePalylist = function (list, playlistId) {
        var _this = this;
        var deferred = Q.defer();
        this.deletePlatlist(playlistId).done(function (res) {
            var sql = "INSERT INTO playlists_assets (playlist_id, asset_id, lasting, position) VALUES (?,?,?,?)";
            var out = [];
            var i = 0;
            list.forEach(function (item) {
                i++;
                if (!item.position)
                    item.position = i;
                if (item.id)
                    item.asset_id = item.id;
                if (!item.lasting && item.id)
                    item.lasting = item.duration;
                out.push([playlistId, item.asset_id, item.lasting, item.position]);
            });
            _this.db.arrayQuery(sql, out).done(function (res) {
                deferred.resolve(res);
            });
        });
        return deferred.promise;
    };
    PlaylistItemsTable.prototype.selectAllPlayLists = function () {
        var sql = "SELECT * FROM assets, " + this.table + " WHERE playlists_assets.asset_id = assets.id";
        var data = [];
        return this.db.selectAll(sql, data);
    };
    PlaylistItemsTable.prototype.getAll = function () {
        var sql = 'SELECT *, playlists_assets.id as psid, playlists_assets.playlist_id as plid FROM  playlists_assets LEFT JOIN assets ON playlists_assets.asset_id = assets.id LEFT JOIN playlists ON playlists_assets.listid=playlists.id ';
        return this.db.selectAll(sql, []);
    };
    PlaylistItemsTable.prototype.selectPlayListItemById = function (id) {
        var sql = "SELECT * FROM assets, " + this.table + " WHERE playlists_assets.id = ? AND playlists_assets.asset_id = assets.id";
        var data = [id];
        return this.db.selectAll(sql, data);
    };
    PlaylistItemsTable.prototype.selectPlayListItemsByListId = function (id) {
        var deferred = Q.defer();
        var sql = "SELECT * FROM  playlists_assets LEFT JOIN assets ON playlists_assets.asset_id = assets.id WHERE playlists_assets.playlist_id = ?";
        var data = [id];
        this.db.selectAll(sql, data).done(function (res) {
            var out = [];
            res.forEach(function (item) {
                var pli = new models_1.VOPlayLists_Assets(item);
                out.push(pli);
            });
            deferred.resolve(out);
        }, function (err) {
        });
        return deferred.promise;
    };
    PlaylistItemsTable.prototype.deletePlaylists_Assets = function (id) {
        var _this = this;
        var deferred = Q.defer();
        var p = this.selectContentById(id).then(function (item1) {
            _this.deleteContent({ id: id });
            var sql = "SELECT *  FROM " + _this.table + " WHERE playlist_id = ? AND after_id = ?";
            _this.db.selectOne(sql, [item1.listId, item1.id]).then(function (item2) {
                var sql = "UPDATE " + _this.table + " SET after_id = ? WHERE id = ?";
                _this.db.updateOne(sql, [item1.afterId, item2.id]).then(function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    console.log('error', err);
                    deferred.reject(err);
                });
            }, function (err) {
                console.log('error', err);
                deferred.reject(err);
            });
        }, function (err) {
            deferred.reject(err);
            console.log('error', err);
        });
        return deferred.promise;
    };
    PlaylistItemsTable.prototype.updatePlaylist_Item = function (item1) {
        var _this = this;
        var deferred = Q.defer();
        if (item1.afterId === 0) {
            deferred.resolve({});
            return;
        }
        var sql = "SELECT *  FROM " + this.table + " WHERE playlist_id = ? AND after_id = ?";
        this.db.selectOne(sql, [item1.listId, item1.id]).then(function (item2) {
            if (!item2.id) {
                deferred.resolve({});
                return;
            }
            var sql = "UPDATE " + _this.table + " SET after_id = ? WHERE id = ?";
            _this.db.updateOne(sql, [item1.id, item2.id]).then(function (result) {
                deferred.resolve(result);
            }, function (err) {
                console.log('error', err);
                deferred.reject(err);
            });
        }, function (err) {
            console.log('error', err);
            deferred.reject(err);
        });
        return deferred.promise;
    };
    ;
    PlaylistItemsTable.prototype.movePlaylistItem = function () { };
    ;
    return PlaylistItemsTable;
}(TableModel_1.TableModel));
exports.PlaylistItemsTable = PlaylistItemsTable;
//# sourceMappingURL=PlaylistItemsTable.js.map