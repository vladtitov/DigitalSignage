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
var DeviceListService = (function () {
    function DeviceListService(http) {
        this.http = http;
        this.devicesSubject = new Rx_1.Subject();
        this.devices$ = this.devicesSubject.asObservable();
        this.serviceUrl = '/api/';
    }
    DeviceListService.prototype.getDevices = function () {
        var _this = this;
        this.http.get(this.serviceUrl + 'layouts/mydevice-all')
            .map(function (res) {
            var out = [];
            var ar = res.json().data;
            ar.forEach(function (item) {
                out.push(new models_1.VODevice(item));
            });
            return out;
        })
            .catch(this.handleError)
            .subscribe(function (devices) {
            _this.devices = devices;
            _this.devicesSubject.next(_this.devices);
            // localStorage.setItem("mylayouts", JSON.stringify(layouts))
        });
    };
    DeviceListService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        //console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    DeviceListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeviceListService);
    return DeviceListService;
}());
exports.DeviceListService = DeviceListService;
//# sourceMappingURL=device-list-service.js.map