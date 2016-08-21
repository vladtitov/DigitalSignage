"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
var DeviceEditorService = (function () {
    function DeviceEditorService(http) {
        this.http = http;
        this.serviceUrl = '/api/';
    }
    DeviceEditorService.prototype.getData = function (id) {
        return this.http.get(this.serviceUrl + 'layouts/mydevice/' + id)
            .map(function (res) {
            var data = res.json();
            return new models_1.VODevice(data.data);
        })
            .catch(this.handleError);
    };
    DeviceEditorService.prototype.getUsedDevice = function (layout) {
        var layout_id = layout.id;
        return this.http.get(this.serviceUrl + 'layouts/mydevice-layout/' + layout_id)
            .map(function (res) {
            var data = res.json();
            return data.data;
        })
            .catch(this.handleError);
    };
    DeviceEditorService.prototype.updateByLayoutId = function (layout_id) {
        return this.http.post(this.serviceUrl + 'layouts/mydevice-update/' + layout_id, layout_id)
            .map(function (res) {
            var data = res.json();
            return new models_1.UpdateResult(data.data);
        })
            .catch(this.handleError);
    };
    DeviceEditorService.prototype.saveData = function (item) {
        return this.http.post(this.serviceUrl + 'layouts/mydevice-new/' + item.id, item)
            .map(function (res) {
            var data = res.json();
            return new models_1.UpdateResult(data.data);
        })
            .catch(this.handleError);
    };
    DeviceEditorService.prototype.deleteDevice = function (device) {
        console.log('deleteDevice ', device);
        console.log('post ', this.serviceUrl + 'layouts/mydevice');
        return this.http.delete(this.serviceUrl + 'layouts/mydevice/' + device.id)
            .map(function (res) {
            var data = res.json();
            console.log('deleteDevice ', data);
            return new models_1.UpdateResult(data.data);
        })
            .catch(this.handleError);
    };
    DeviceEditorService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        //console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    DeviceEditorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeviceEditorService);
    return DeviceEditorService;
}());
exports.DeviceEditorService = DeviceEditorService;
//# sourceMappingURL=device-editor-service.js.map