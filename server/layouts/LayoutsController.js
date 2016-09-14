"use strict";
var Q = require('q');
var models_1 = require("../../client/app/services/models");
var dbDriver_1 = require("../db/dbDriver");
var LayoutsController = (function () {
    function LayoutsController(folder) {
        this.folder = folder;
        this.db = new dbDriver_1.DBDriver(this.folder);
    }
    LayoutsController.prototype.deleteContentById = function (id) {
        var deferred = Q.defer();
        var db = this.db;
        db.deleteById(id, 'layouts').done(function (res1) { return db.deleteByIdinColumn(id, 'layout_id', 'layouts_viewports').done(function (res2) { return deferred.resolve(res2); }, function (err) { return deferred.reject(err); }); }, function (err) { return deferred.reject(err); });
        return deferred.promise;
    };
    LayoutsController.prototype.updateViewPorts = function (list, layoutId) {
        var def = Q.defer();
        var db = this.db;
        db.deleteByIdinColumn(layoutId, 'layout_id', 'layouts_viewports').done(function (res) {
            var sql = "INSERT INTO layouts_viewports (layout_id, viewport_id, playlist_id, x, y, width, height,  player_type, label, image) VALUES (?,?,?,?,?,?,?,?,?,?)";
            var out = [];
            var i = 0;
            list.forEach(function (item) {
                i++;
                if (!item.id)
                    item.id = i;
                if (!item.playlist_id)
                    item.playlist_id = 0;
                if (!item.playertype)
                    item.playertype = 'player-lite';
                if (!item.label)
                    item.label = item.x + ',' + item.y + '-' + item.width + 'x' + item.height;
                out.push([layoutId, item.id, item.playlist_id, item.x, item.y, item.width, item.height, item.playertype, item.label, item.image]);
            });
            db.arrayQuery(sql, out).done(function (res) {
                def.resolve(res);
            }, function (err) {
                def.reject(err);
            });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    LayoutsController.prototype.getLayoutFull = function (id) {
        var def = Q.defer();
        var db = this.db;
        db.selectById(id, 'layouts').done(function (res1) { return db.selectByValue(id, 'layout_id', 'layouts_viewports').done(function (res2) { return def.resolve({ props: res1, viewports: res2 }); }, function (err) { return def.reject(err); }); }, function (err) { return def.reject(err); });
        return def.promise;
    };
    LayoutsController.prototype.updateContentById = function (row, id) {
        row.timestamp = Math.floor(Date.now() / 1000);
        if (id == -1)
            return this.db.insertRow(row, 'layouts');
        else
            return this.db.updateRow(row, 'layouts');
    };
    LayoutsController.prototype.margeTables = function (layouts, lay_vp) {
        var lays = [];
        var getViewports = function (id, lay_vp) {
            var out = [];
            lay_vp.forEach(function (item) {
                if (item.layout_id == id)
                    out.push(new models_1.VOViewport(item));
            });
            return out;
        };
        layouts.forEach(function (item) {
            var layout = new models_1.VOLayout({
                props: item,
                viewports: getViewports(item.id, lay_vp)
            });
            lays.push(layout);
        });
        return lays;
    };
    LayoutsController.prototype.getAllAssembled = function () {
        var _this = this;
        var def = Q.defer();
        var db = this.db;
        db.selectAllTable('layouts').done(function (lays) { return db.selectAllTable('layouts_viewports').done(function (l_v) { return def.resolve(_this.margeTables(lays, l_v)); }, function (err) { return def.reject(err); }); }, function (err) { return def.reject(err); });
        return def.promise;
    };
    LayoutsController.prototype.getAllTemplates = function () {
        var deferred = Q.defer();
        var db = this.db;
        db.selectAllTable('templates').done(function (rows) {
            var out = [];
            rows.forEach(function (item) {
                item.viewports = JSON.parse(item.viewports);
                out.push(new models_1.VOTemplate(item));
                deferred.resolve(out);
            });
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
    };
    return LayoutsController;
}());
exports.LayoutsController = LayoutsController;
//# sourceMappingURL=LayoutsController.js.map