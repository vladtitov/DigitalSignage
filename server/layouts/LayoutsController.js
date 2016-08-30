"use strict";
var TableModel_1 = require("../db/TableModel");
var Q = require('q');
var models_1 = require("../../client/app/services/models");
var LayoutsController = (function () {
    function LayoutsController(folder) {
        this.layouts = new TableModel_1.TableModel(folder, 'layouts');
        this.layouts_viewports = new TableModel_1.TableModel(folder, 'layouts_viewports');
        this.devices = new TableModel_1.TableModel(folder, 'devices');
    }
    LayoutsController.prototype.deleteContentById = function (id) {
        var _this = this;
        var deferred = Q.defer();
        this.layouts.deleteById(id).done(function (res1) {
            _this.layouts_viewports.deleteByFieldId('layout_id', id).done(function (res2) {
                res1.changes += res2.changes;
                deferred.resolve(res1);
            }, function (err) { return deferred.reject(err); });
        }, function (err) { return deferred.reject(err); });
        return deferred.promise;
    };
    LayoutsController.prototype.updateViewPorts = function (list, layoutId) {
        var _this = this;
        var deferred = Q.defer();
        this.deleteViewPorts(layoutId).done(function (res) {
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
            _this.layouts_viewports.db.arrayQuery(sql, out).done(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    LayoutsController.prototype.getViewportsByLayoutId = function (id) {
        var deferred = Q.defer();
        var out = [];
        var sql = 'SELECT * FROM layouts_viewports WHERE layout_id =?';
        this.layouts_viewports.db.selectAll(sql, [id]).done(function (res) {
            res.forEach(function (item) {
                out.push(new models_1.VOViewport(item));
            });
            deferred.resolve(out);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    LayoutsController.prototype.getLayoutById = function (id) {
        return this.layouts.selectContentById(id);
    };
    LayoutsController.prototype.deleteViewPorts = function (id) {
        var sql = "DELETE FROM layouts_viewports WHERE layout_id =? ";
        return this.layouts_viewports.db.deleteAll(sql, [id]);
    };
    LayoutsController.prototype.updateContentById = function (row, id) {
        row.timestamp = Math.floor(Date.now() / 1000);
        if (id == -1)
            return this.insertContent(row);
        else
            return this.layouts.updateContent(row);
    };
    LayoutsController.prototype.insertContent = function (row) {
        if (!row.label)
            row.label = 'new layout ';
        delete row.id;
        return this.layouts.insertContent(row);
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
        var deferred = Q.defer();
        this.layouts.selectAllContent().done(function (lays) {
            _this.layouts_viewports.selectAllContent().done(function (l_v) {
                deferred.resolve(_this.margeTables(lays, l_v));
            }, function (err) { deferred.reject(err); });
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
    };
    LayoutsController.prototype.getAllTemplates = function () {
        var deferred = Q.defer();
        this.layouts.selectAllContent('templates').done(function (rows) {
            var out = [];
            rows.forEach(function (item) {
                item.viewports = JSON.parse(item.viewports);
                out.push(new models_1.VOTemplate(item));
                deferred.resolve(out);
            });
        }, function (err) { deferred.reject(err); });
        return deferred.promise;
    };
    LayoutsController.prototype.saveAssemble = function (layout, id) {
        var deferred = Q.defer();
        return deferred.promise;
    };
    return LayoutsController;
}());
exports.LayoutsController = LayoutsController;
//# sourceMappingURL=LayoutsController.js.map