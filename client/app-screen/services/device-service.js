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
/**
 * Created by Vlad on 7/16/2016.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var models_1 = require("../../app/services/models");
var DeviceService = (function () {
    function DeviceService(http) {
        this.http = http;
        this.service = 'api/player';
    }
    DeviceService.prototype.getDevice = function (id) {
        this.screenid = id;
        return this.http.get(this.service + '/mydevice/' + id)
            .map(function (resp) { return new models_1.VODevice(resp.json().data); })
            .catch(this.handleError);
    };
    DeviceService.prototype.getPlaylist = function (id) {
        return this.http.get(this.service + '/playlist/' + id)
            .map(function (resp) { return new models_1.VOPlaylist(resp.json().data); })
            .catch(this.handleError);
    };
    DeviceService.prototype.getLayout = function (id) {
        return this.http.get(this.service + '/layout/' + id)
            .map(function (resp) { return new models_1.VOLayout(resp.json().data); })
            .catch(this.handleError);
    };
    DeviceService.prototype.seveStatistics = function (stats, id) {
        return this.http.post(this.service + '/statistics/' + id, stats)
            .map(function (resp) {
            return new models_1.UpdateResult(resp.json().data);
        })
            .catch(this.handleError);
    };
    DeviceService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    DeviceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
var PlaylistItem = (function () {
    function PlaylistItem() {
    }
    return PlaylistItem;
}());
exports.PlaylistItem = PlaylistItem;
//# sourceMappingURL=device-service.js.map