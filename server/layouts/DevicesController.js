"use strict";
var TableModel_1 = require("../db/TableModel");
var Q = require('q');
var models_1 = require("../../client/app/services/models");
var dbDriver_1 = require("../db/dbDriver");
var DevicesController = (function () {
    function DevicesController(folder) {
        this.folder = folder;
        this.devices = new TableModel_1.TableModel(folder, 'devices');
        this.db = new dbDriver_1.DBDriver(folder);
    }
    DevicesController.prototype.getDeviceById = function (id) {
        return this.devices.selectContentById(id);
    };
    DevicesController.prototype.mapViewports = function (dev, res) {
        dev.layout.viewports = res;
        return dev;
    };
    DevicesController.prototype.mapDevice = function (id, res1) {
        var mydevice = new models_1.VODevice({
            id: id,
            timestamp: res1.d_stamp,
            layout_id: res1.layout_id,
            layout: { props: {
                    id: res1.layout_id,
                    width: res1.width,
                    height: res1.height,
                    timestamp: res1.timestamp
                }
            }
        });
        return mydevice;
    };
    DevicesController.prototype.getDeviceWithLayout = function (id) {
        var _this = this;
        var def = Q.defer();
        var sql1 = 'SELECT * , devices.timestamp AS d_stamp' +
            ' FROM devices LEFT JOIN layouts ON layouts.id=devices.layout_id ' +
            ' WHERE devices.id=' + id;
        var sql2 = 'SELECT * FROM layouts_viewports WHERE layouts_viewports.layout_id=';
        this.db.queryOne(sql1).done(function (res) {
            if (res && res.layout_id) {
                var dev = _this.mapDevice(id, res);
                _this.db.queryAll(sql2 + dev.layout_id).done(function (res2) {
                    dev = _this.mapViewports(dev, res2);
                    def.resolve(dev);
                }, function (err) { return def.reject(err); });
            }
            else
                def.reject(res);
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    DevicesController.prototype.updateContentById = function (row, id) {
        row.timestamp = Math.floor(Date.now() / 1000);
        if (id === -1)
            return this.insertContent(row);
        else
            return this.devices.updateContent(row);
    };
    DevicesController.prototype.insertContent = function (row) {
        if (!row.label)
            row.label = 'new Device ';
        delete row.id;
        return this.devices.insertContent(row);
    };
    DevicesController.prototype.getAllDevices = function () {
        var sql = 'SELECT * FROM devices';
        return this.db.queryAll(sql);
    };
    DevicesController.prototype.getDevicesByLayoutId = function (layout_id) {
        var deferred = Q.defer();
        var sql = 'SELECT * FROM devices WHERE layout_id = ' + Number(layout_id);
        this.devices.db.queryAll(sql).done(function (res) { return deferred.resolve(res); }, function (err) { return deferred.reject(err); });
        return deferred.promise;
    };
    DevicesController.prototype.updateByLayoutId = function (layout_id) {
        var deferred = Q.defer();
        var timestamp = Math.floor(Date.now() / 1000);
        var sql = 'UPDATE devices SET timestamp = ' + timestamp + ', layout_id = 0 WHERE layout_id = ' + Number(layout_id);
        this.devices.db.runQuery(sql).done(function (res) { return deferred.resolve(res); }, function (err) { return deferred.reject(err); });
        return deferred.promise;
    };
    DevicesController.prototype.deleteDevice = function (id) {
        return this.devices.deleteById(id);
    };
    return DevicesController;
}());
exports.DevicesController = DevicesController;
//# sourceMappingURL=DevicesController.js.map